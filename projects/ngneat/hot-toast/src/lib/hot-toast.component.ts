import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HotToastBaseComponent } from './components/hot-toast-base/hot-toast-base.component';
import { Toast, ToastPosition } from './hot-tast.model';

@Component({
  selector: 'lib-hot-toast',
  templateUrl: './hot-toast.component.html',
  styles: [],
})
export class HotToastComponent implements OnInit {
  toasts: Toast[] = [];
  position: ToastPosition = 'top-center';
  reverseOrder: boolean = false;
  pauseDivHeight: string | number = 0;
  pauseDivWidth: string | number = 0;

  private readonly offsetMargin = 8;

  @ViewChildren(HotToastBaseComponent) hotToastList!: QueryList<HotToastBaseComponent>;
  pausedAt: number;

  constructor() {}

  ngOnInit(): void {}

  trackById(index: number, toast: Toast) {
    return toast.id;
  }

  calculateOffset(toastId: string) {
    const visibleToasts = this.toasts.filter((t) => t.visible);
    const index = visibleToasts.findIndex((toast) => toast.id === toastId);
    const offset =
      index !== -1
        ? visibleToasts
            .slice(...(this.reverseOrder ? [index + 1] : [0, index]))
            .reduce((acc, t) => acc + (t.height || 0) + this.offsetMargin, 0)
        : 0;
    return offset;
  }

  updateHeight() {
    this.pauseDivHeight =
      this.toasts
        .map((t, i) => (t.height || 0) + this.offsetMargin)
        .reduce((p, c) => {
          return p + c;
        }, 0) + 'px';
  }

  updateWidth() {
    this.pauseDivWidth = Math.max(...this.toasts.map((t) => t.width || 0)) + 'px';
  }

  startPause() {
    this.pausedAt = Date.now();
  }

  endPause() {
    if (this.pausedAt) {
      this.pausedAt = undefined;
    }
  }
}
