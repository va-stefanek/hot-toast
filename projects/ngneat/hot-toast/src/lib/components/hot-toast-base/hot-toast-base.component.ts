import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Toast, ToastPosition } from '../../hot-toast.model';
import { isComponent, isTemplateRef } from '../../utils';

@Component({
  selector: 'lib-hot-toast-base',
  templateUrl: 'hot-toast-base.component.html',
  styleUrls: ['./hot-toast-base.component.scss'],
})
export class HotToastBaseComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges, DoCheck {
  @Input() toast: Toast;
  @Input() position: ToastPosition = 'top-center';
  @Input() offset = 0;
  @Input() pausedAt: number;
  @Input() diff: number;

  @Output() onHeight = new EventEmitter<number>();
  @Output() onWidth = new EventEmitter<number>();

  @Output() remove = new EventEmitter();
  timeout: any;
  oldDuration = 0;

  isTemplateRef = isTemplateRef;
  isComponent = isComponent;

  constructor(public el: ElementRef<HTMLElement>) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const toastBarBase = this.el.nativeElement.querySelector('.hot-toast-bar-base') as HTMLElement;
    if (toastBarBase) {
      setTimeout(() => {
        this.onHeight.emit(toastBarBase.offsetHeight);
        this.onWidth.emit(toastBarBase.offsetWidth);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pausedAt && changes.pausedAt.previousValue !== changes.pausedAt.currentValue) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = this.generateTimeout();
    }
    if (changes.diff && changes.diff.previousValue !== changes.diff.currentValue) {
      this.toast.pauseDuration += this.diff;
    }
  }

  ngDoCheck() {
    if (this.toast.duration !== this.oldDuration) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = this.generateTimeout();
      this.oldDuration = this.toast.duration;
    }
  }

  getPositionStyle() {
    const top = this.position.includes('top');
    const verticalStyle = top ? { top: 0 } : { bottom: 0 };

    const horizontalStyle = this.position.includes('left')
      ? {
          left: 0,
        }
      : this.position.includes('right')
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
    return (this.toast.className ? this.toast.className : '') + ' ' + this.getAnimationClass();
  }

  getAnimationClass(): string {
    const top = this.position.includes('top');
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
        this.toast.visible = false;
        setTimeout(() => {
          this.remove.emit();
        }, 1000);
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

    return setTimeout(dismiss, durationLeft);
  }

  ngOnDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  get isIconString() {
    return typeof this.toast.icon === 'string' || typeof this.toast.icon === 'number';
  }

  get isMessageString() {
    return typeof this.toast.message === 'string' || typeof this.toast.message === 'number';
  }
}
