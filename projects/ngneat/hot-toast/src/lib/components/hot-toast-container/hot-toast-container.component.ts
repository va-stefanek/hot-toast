import { ChangeDetectionStrategy, ChangeDetectorRef, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../constants';
import {
  DefaultToastOptions,
  HotToastClose,
  resolveValueOrFunction,
  Toast,
  ToastConfig,
  ToastPosition,
  UpdateToastOptions,
  HotToastRefProps,
  AddToastRef,
} from '../../hot-toast.model';
import { HotToastRef } from '../../hot-toast-ref';
import { filter, takeUntil } from 'rxjs/operators';
import { Content } from '@ngneat/overview';
import { HotToastComponent } from '../hot-toast/hot-toast.component';

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
  private _onClosed = new Subject<HotToastClose>();

  @ViewChildren(HotToastComponent) hotToastComponentList: QueryList<HotToastComponent>;
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

  addToast(ref: HotToastRef): AddToastRef {
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

        const comp = this.hotToastComponentList.find((item) => item.toast.id === toast.id);
        if (comp) {
          comp.close();
        }
      },
      unsubscribe: () => {
        subscription?.unsubscribe();
      },
      updateMessage: (message: Content) => {
        toast.message = message;
        this.cdr.detectChanges();
      },
      updateToast: (options: UpdateToastOptions) => {
        this.updateToasts(toast, options);
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
          this.updateToasts(toast);
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
          this.updateToasts(toast);
          this.cdr.detectChanges();
        }
      }
    );
    return { toast, subscription };
  }

  private getAfterClosed(toast: Toast) {
    return this.onClosed$.pipe(filter((v) => v.id === toast.id));
  }

  private updateToasts(toast: Toast, options?: UpdateToastOptions) {
    this.toasts = this.toasts.map((t) => ({ ...t, ...(t.id === toast.id && { ...toast, ...options }) }));
  }

  beforeClosed(toast: Toast) {
    toast.visible = false;
  }

  afterClosed(closeToast: HotToastClose) {
    const toastIndex = this.toasts.findIndex((t) => t.id === closeToast.id);
    if (toastIndex > -1) {
      this._onClosed.next(closeToast);
      this.toasts = this.toasts.filter((t) => t.id !== closeToast.id);
      this.cdr.detectChanges();
    }
  }

  hasToast(id: string) {
    return this.toasts.findIndex((t) => t.id === id) > -1;
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((s) => s.unsubscribe());
  }
}
