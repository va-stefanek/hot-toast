import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../constants';
import {
  DefaultToastOptions,
  Renderable,
  resolveValueOrFunction,
  Toast,
  ToastConfig,
  ToastRef,
  UpdateToastOptions,
} from '../../hot-toast.model';
import { isComponent, isTemplateRef } from '../../utils';

@Component({
  selector: 'lib-hot-toast-base',
  templateUrl: 'hot-toast-base.component.html',
  styleUrls: ['./hot-toast-base.component.scss'],
})
export class HotToastBaseComponent implements AfterViewInit, OnDestroy {
  @Input() toast: Toast;
  @Input() offset = 0;
  @Input() defaultConfig: ToastConfig;

  @Output() onHeight = new EventEmitter<number>();
  @Output() onWidth = new EventEmitter<number>();
  @Output() remove = new EventEmitter();

  diff: number;
  pausedAt: number;
  timeout: any;
  oldDuration = 0;

  isTemplateRef = isTemplateRef;
  isComponent = isComponent;

  toastRef: ToastRef;
  afterClosed = new Subject();
  afterOpened = new Subject();
  subscription: Subscription;

  /**This is same as enter animation time of toast */
  readonly TOAST_SHOW_ANIMATION_TIME = 350;

  constructor(public el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    const toastBarBase = this.el.nativeElement.querySelector('.hot-toast-bar-base') as HTMLElement;
    if (toastBarBase) {
      setTimeout(() => {
        this.onHeight.emit(toastBarBase.offsetHeight);
        this.onWidth.emit(toastBarBase.offsetWidth);
      });
    }
    setTimeout(() => {
      this.afterOpened.next();
    }, this.TOAST_SHOW_ANIMATION_TIME);
  }

  startPause() {
    this.pausedAt = Date.now();
  }

  endPause() {
    this.diff = Date.now() - (this.pausedAt || 0);
    if (this.pausedAt) {
      this.pausedAt = undefined;
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.generateTimeout();
  }

  getPositionStyle() {
    const top = this.toast.position.includes('top');
    const verticalStyle = top ? { top: 0 } : { bottom: 0 };

    const horizontalStyle = this.toast.position.includes('left')
      ? {
          left: 0,
        }
      : this.toast.position.includes('right')
      ? {
          right: 0,
        }
      : {
          left: 0,
          right: 0,
          justifyContent: 'center',
        };
    return {
      transform: `translateY(${this.offset * (top ? 1 : -1)}px)`,
      ...verticalStyle,
      ...horizontalStyle,
    };
  }

  getToastBarBaseClasses() {
    return (this.toast.className ?? ' ') + this.getAnimationClass();
  }

  getAnimationClass(): string {
    const top = this.toast.position.includes('top');
    return this.toast.visible
      ? `enterAnimation${top ? 'Negative' : 'Positive'}`
      : `exitAnimation${top ? 'Negative' : 'Positive'}`;
  }

  generateTimeout() {
    const dismiss = () => {
      if (this.pausedAt || this.toast.dismissible) {
        return;
      }
      setTimeout(() => {
        this.close();
      }, this.toast.duration);
    };

    const now = Date.now();

    const durationLeft = (this.toast.duration || 0) + this.toast.pauseDuration - (now - this.toast.createdAt);

    if (durationLeft < 0) {
      if (this.toast.visible) {
        dismiss();
      }
      return;
    }

    this.timeout = setTimeout(dismiss, durationLeft);
  }

  close() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.toast.visible = false;
    this.remove.emit();
  }

  get isIconString() {
    return typeof this.toast.icon === 'string' || typeof this.toast.icon === 'number';
  }

  get isMessageString() {
    return typeof this.toast.message === 'string' || typeof this.toast.message === 'number';
  }

  makeToastRef() {
    this.toastRef = {
      close: () => {
        this.close();
      },
      updateMessage: (message: Renderable) => {
        this.toast.message = message;
      },
      updateToast: (options: UpdateToastOptions) => {
        this.toast = Object.assign(this.toast, options);
      },
      unsubscribe: () => {
        this.subscription.unsubscribe();
      },
      afterClosed: this.afterClosed,
      afterOpened: this.afterOpened,
    };
  }

  checkForObserve() {
    if (this.toast.observable) {
      this.subscription = this.toast.observable.subscribe(
        (v) => {
          if (this.toast.observableMessages?.subscribe) {
            if (this.timeout) {
              clearTimeout(this.timeout);
            }
            this.toast.message = resolveValueOrFunction(this.toast.observableMessages.subscribe, v);
            this.toast = Object.assign(this.toast, {
              type: 'success',
              duration: HOT_TOAST_DEFAULT_TIMEOUTS['success'],
              ...this.defaultConfig?.success,
              ...(this.toast as DefaultToastOptions).success,
            });

            this.generateTimeout();
          }
        },
        (e) => {
          if (this.toast.observableMessages?.error) {
            if (this.timeout) {
              clearTimeout(this.timeout);
            }
            this.toast.message = resolveValueOrFunction(this.toast.observableMessages.error, e);
            this.toast = Object.assign(this.toast, {
              type: 'error',
              duration: HOT_TOAST_DEFAULT_TIMEOUTS['error'],
              ...this.defaultConfig?.error,
              ...(this.toast as DefaultToastOptions).error,
            });
            this.generateTimeout();
          }
        },
        () => {
          if (this.toast.observableMessages?.complete) {
            if (this.timeout) {
              clearTimeout(this.timeout);
            }
            this.toast.message = resolveValueOrFunction(this.toast.observableMessages.complete, undefined);
            this.toast = Object.assign(this.toast, {
              ...this.toast,
              type: 'success',
              duration: HOT_TOAST_DEFAULT_TIMEOUTS['success'],
              ...this.defaultConfig?.success,
              ...(this.toast as DefaultToastOptions).success,
            });
            this.generateTimeout();
          }
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.subscription) {
      this.subscription.unsubscribe;
    }
    this.afterClosed.next();
  }
}
