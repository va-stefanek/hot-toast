import { Input, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../constants';
import {
  DefaultToastOptions,
  Renderable,
  resolveValueOrFunction,
  Toast,
  ToastConfig,
  ToastPosition,
  UpdateToastOptions,
  _HotToastRef,
} from '../../hot-toast.model';
import { HotToastRef } from '../../hot-toast-ref';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'hot-toast-container',
  templateUrl: './hot-toast-container.component.html',
})
export class HotToastContainerComponent implements OnDestroy {
  @Input() defaultConfig: ToastConfig;

  toasts: Toast[] = [];

  private readonly OFFSET_MARGIN = 8;

  /**This is same as exit animation time of toast */
  private readonly TOAST_EXIT_ANIMATION_TIME = 800;

  subscriptionList: Subscription[] = [];

  /** Subject for notifying the user that the toast has opened and appeared. */
  private _onOpened = new Subject<string>();
  onOpened$ = this._onOpened.asObservable();
  /** Subject for notifying the user that the toast has been closed. */
  private _onClosed = new Subject<string>();
  onClosed$ = this._onClosed.asObservable();

  constructor() {}

  calculateOffset(toastId: string, position: ToastPosition) {
    const visibleToasts = this.toasts.filter((t) => t.visible && t.position === position);
    const index = visibleToasts.findIndex((toast) => toast.id === toastId);
    const offset =
      index !== -1
        ? visibleToasts
            .slice(...(this.defaultConfig.reverseOrder ? [index + 1] : [0, index]))
            .reduce((acc, t) => acc + (t.height || 0) + this.OFFSET_MARGIN, 0)
        : 0;
    return offset;
  }

  updateHeight(height: number, toast: Toast) {
    toast.height = height;
  }

  addToast(ref: HotToastRef): _HotToastRef {
    let toast = ref.getToast();
    let subscription: Subscription;

    this.toasts = [...this.toasts, ref.getToast()];

    if (toast.observable) {
      ({ toast, subscription } = this.updateToast(toast, subscription));
      this.subscriptionList.push(subscription);
    }

    return {
      dispose: () => {
        if (subscription) {
          subscription.unsubscribe();
        }
        this.afterClosed(ref.getToast());
      },
      unsubscribe: () => {
        subscription?.unsubscribe();
      },
      updateMessage: (message: Renderable) => {
        toast.message = message;
      },
      updateToast: (options: UpdateToastOptions) => {
        toast = Object.assign(toast, { ...toast, ...options });
      },
      afterOpened: this.onOpened$.pipe(filter((v) => v === toast.id)),
      afterClosed: this.onClosed$.pipe(filter((v) => v === toast.id)),
    };
  }

  private updateToast(toast: Toast, subscription: Subscription) {
    subscription = toast.observable.subscribe(
      (v) => {
        if (toast.observableMessages?.subscribe) {
          toast.message = resolveValueOrFunction(toast.observableMessages.subscribe, v);
          toast = Object.assign(toast, {
            ...toast,
            type: 'success',
            duration: HOT_TOAST_DEFAULT_TIMEOUTS['success'],
            ...this.defaultConfig?.success,
            ...(toast as DefaultToastOptions)?.success,
          });
        }
      },
      (e) => {
        if (toast.observableMessages?.error) {
          toast.message = resolveValueOrFunction(toast.observableMessages.error, e);
          toast = Object.assign(toast, {
            ...toast,
            type: 'error',
            duration: HOT_TOAST_DEFAULT_TIMEOUTS['error'],
            ...this.defaultConfig?.error,
            ...(toast as DefaultToastOptions)?.error,
          });
        }
      },
      () => {
        if (toast.observableMessages?.complete) {
          toast.message = resolveValueOrFunction(toast.observableMessages.complete, undefined);
          toast = Object.assign(toast, {
            ...toast,
            type: 'success',
            duration: HOT_TOAST_DEFAULT_TIMEOUTS['success'],
            ...this.defaultConfig?.success,
            ...(toast as DefaultToastOptions)?.success,
          });
        }
      }
    );
    return { toast, subscription };
  }

  afterOpened(id: string) {
    this._onOpened.next(id);
  }

  afterClosed(toast: Toast) {
    const toastIndex = this.toasts.findIndex((t) => t.id === toast.id);
    if (toastIndex > -1) {
      toast.visible = false;
      setTimeout(() => {
        this._onClosed.next(toast.id);
      }, this.TOAST_EXIT_ANIMATION_TIME);
      setTimeout(() => {
        this.toasts.splice(
          this.toasts.findIndex((t) => t.id === toast.id),
          1
        );
      }, 1000);
    }
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((s) => s.unsubscribe());
  }
}
