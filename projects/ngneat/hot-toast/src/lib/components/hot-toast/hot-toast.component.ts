import { AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Toast, ToastConfig } from '../../hot-toast.model';

@Component({
  selector: 'hot-toast',
  templateUrl: 'hot-toast.component.html',
  styleUrls: ['./hot-toast.component.scss'],
})
export class HotToastComponent implements AfterViewInit, OnDestroy, DoCheck {
  @Input() toast: Toast;
  @Input() offset = 0;
  @Input() defaultConfig: ToastConfig;

  @Output() onHeight = new EventEmitter<number>();
  @Output() onWidth = new EventEmitter<number>();
  @Output() afterClosed = new EventEmitter();
  @Output() afterOpened = new EventEmitter();

  diff: number;
  pausedAt: number;
  timeout: any;
  oldDuration = 0;

  /**This is same as enter animation time of toast */
  readonly TOAST_SHOW_ANIMATION_TIME = 350;

  constructor(public el: ElementRef<HTMLElement>) {}

  ngDoCheck() {
    if (this.oldDuration !== this.toast.duration) {
      this.oldDuration = this.toast.duration;
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.generateTimeout();
    }
  }

  ngAfterViewInit() {
    const toastBarBase = this.el.nativeElement.querySelector('.hot-toast-bar-base') as HTMLElement;
    if (toastBarBase) {
      setTimeout(() => {
        this.onHeight.emit(toastBarBase.offsetHeight);
        this.onWidth.emit(toastBarBase.offsetWidth);
      });
    }
    setTimeout(() => {
      this.afterOpened.emit();
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
        console.log('returning undefined');
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
    this.afterClosed.emit();
  }

  get isIconString() {
    return typeof this.toast.icon === 'string';
  }

  get isMessageString() {
    return typeof this.toast.message === 'string';
  }

  ngOnDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
