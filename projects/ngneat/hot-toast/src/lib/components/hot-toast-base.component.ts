import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Toast, ToastPosition } from '../hot-tast.model';

@Component({
  selector: 'lib-hot-toast-base',
  templateUrl: 'hot-toast-base.component.html',
  styleUrls: ['./hot-toast-base.component.scss'],
})
export class HotToastBaseComponent implements OnInit, AfterViewInit {
  @Input() toast: Toast;
  @Input() position: ToastPosition = 'top-center';
  @Input() offset = 0;

  @Output() onHeight = new EventEmitter<number>();
  @Output() remove = new EventEmitter();

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    setTimeout(() => {
      this.toast.visible = false;
      setTimeout(() => {
        this.remove.emit();
      }, 1000);
    }, this.toast.duration);
  }

  ngAfterViewInit() {
    const toastBarBase = this.el.nativeElement.querySelector('.hot-toast-bar-base') as HTMLElement;
    if (toastBarBase) {
      setTimeout(() => {
        this.onHeight.emit(toastBarBase.offsetHeight);
      });
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

  getAnimationClass(): string {
    const top = this.position.includes('top');
    return this.toast.visible
      ? `enterAnimation${top ? 'Negative' : 'Positive'}`
      : `exitAnimation${top ? 'Negative' : 'Positive'}`;
  }
}
