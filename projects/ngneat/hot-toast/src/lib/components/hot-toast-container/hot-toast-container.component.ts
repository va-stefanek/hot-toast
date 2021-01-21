import { ChangeDetectionStrategy, ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../constants';
import {
  DefaultToastOptions,
  resolveValueOrFunction,
  Toast,
  ToastConfig,
  ToastPosition,
  UpdateToastOptions,
  _HotToastRef,
} from '../../hot-toast.model';
import { HotToastRef } from '../../hot-toast-ref';
import { filter, takeUntil } from 'rxjs/operators';
import { Content } from '@ngneat/overview';

@Component({
  selector: 'hot-toast-container',
  templateUrl: './hot-toast-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotToastContainerComponent implements OnDestroy {
  @Input() defaultConfig: ToastConfig;

  toasts: Toast[] = [];

  private readonly OFFSET_MARGIN = 8;

  private subscriptionList: Subscription[] = [];

  /** Subject for notifying the user that the toast has been closed. */
  private _onClosed = new Subject<string>();
  private onClosed$ = this._onClosed.asObservable();

  constructor(private cdr: ChangeDetectorRef) {}

  trackById(index: number, toast: Toast) {
    return toast.id;
  }

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

    this.toasts.push(ref.getToast());

    this.cdr.detectChanges();

    if (toast.observable) {
      ({ toast, subscription } = this.updateSubscription(toast, subscription));
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
      updateMessage: (message: Content) => {
        toast.message = message;
        this.cdr.detectChanges();
      },
      updateToast: (options: UpdateToastOptions) => {
        toast = Object.assign(toast, { ...toast, ...options });
        this.cdr.detectChanges();
      },
      afterClosed: this.getAfterClosed(toast),
    };
  }

  private updateSubscription(toast: Toast, subscription: Subscription) {
    subscription = toast.observable.pipe(takeUntil(this.getAfterClosed(toast))).subscribe(
      (v) => {
        if (toast.observableMessages?.next) {
          toast.message = resolveValueOrFunction(toast.observableMessages.next, v);
          toast = Object.assign(toast, {
            ...toast,
            type: 'success',
            duration: HOT_TOAST_DEFAULT_TIMEOUTS['success'],
            ...this.defaultConfig?.success,
            ...(toast as DefaultToastOptions)?.success,
          });
          this.cdr.detectChanges();
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
          this.cdr.detectChanges();
        }
      }
    );
    return { toast, subscription };
  }

  private getAfterClosed(toast: Toast) {
    return this.onClosed$.pipe(filter((v) => v === toast.id));
  }

  beforeClosed(toast: Toast) {
    toast.visible = false;
  }

  afterClosed(toast: Toast) {
    const toastIndex = this.toasts.findIndex((t) => t.id === toast.id);
    if (toastIndex > -1) {
      this._onClosed.next(toast.id);
      this.toasts = this.toasts.filter((t) => t.id !== toast.id);
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((s) => s.unsubscribe());
  }
}
