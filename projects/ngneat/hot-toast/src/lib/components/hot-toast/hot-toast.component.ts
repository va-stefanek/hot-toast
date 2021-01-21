import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Toast, ToastConfig } from '../../hot-toast.model';
import { animate } from '../../utils';

@Component({
  selector: 'hot-toast',
  templateUrl: 'hot-toast.component.html',
  styleUrls: ['./hot-toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotToastComponent implements AfterViewInit, OnDestroy {
  @Input() toast: Toast;
  @Input() offset = 0;
  @Input() defaultConfig: ToastConfig;

  @Output() onHeight = new EventEmitter<number>();
  @Output() beforeClosed = new EventEmitter();
  @Output() afterClosed = new EventEmitter();

  /**This is same as enter animation time of toast */
  readonly TOAST_SHOW_ANIMATION_TIME = 350;

  isManualClose = false;

  @ViewChild('hotToastBarBase') private toastBarBase: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    const nativeElement = this.toastBarBase.nativeElement;
    this.onHeight.emit(nativeElement.offsetHeight);

    nativeElement.addEventListener('animationstart', (ev: AnimationEvent) => {
      if (this.isExitAnimation(ev)) {
        this.beforeClosed.emit();
      }
    });
    nativeElement.addEventListener('animationend', (ev: AnimationEvent) => {
      if (this.isExitAnimation(ev)) {
        this.afterClosed.emit();
      }
    });
  }

  private isExitAnimation(ev: AnimationEvent) {
    return ev.animationName.includes('hotToastExitAnimation');
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
    return this.toast.className ?? ' ';
  }

  get toastBarBaseStyles() {
    const top = this.toast.position.includes('top');

    const enterAnimation = `hotToastEnterAnimation${
      top ? 'Negative' : 'Positive'
    } 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards`;

    const exitAnimation = `hotToastExitAnimation${
      top ? 'Negative' : 'Positive'
    } 0.8s forwards cubic-bezier(0.06, 0.71, 0.55, 1) ${this.toast.duration}ms`;

    const animation =
      this.toast.dismissible || !this.toast.autoClose ? enterAnimation : `${enterAnimation}, ${exitAnimation}`;

    return { ...this.toast.style, animation };
  }

  close() {
    this.isManualClose = true;
    const top = this.toast.position.includes('top');

    const exitAnimation = `hotToastExitAnimation${
      top ? 'Negative' : 'Positive'
    } 0.8s forwards cubic-bezier(0.06, 0.71, 0.55, 1)`;

    const nativeElement = this.toastBarBase.nativeElement;

    animate(nativeElement, exitAnimation);
  }

  get isIconString() {
    return typeof this.toast.icon === 'string';
  }

  get isMessageString() {
    return typeof this.toast.message === 'string';
  }

  ngOnDestroy() {
    this.close();
  }
}
