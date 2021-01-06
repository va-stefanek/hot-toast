import { Component, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}

  trackById(index: number, toast: Toast) {
    return toast.id;
  }

  calculateOffset(toastId: string) {
    const visibleToasts = this.toasts.filter((t) => t.visible);
    const margin = 8;
    const index = visibleToasts.findIndex((toast) => toast.id === toastId);
    const offset =
      index !== -1
        ? visibleToasts
            .slice(...(this.reverseOrder ? [index + 1] : [0, index]))
            .reduce((acc, t) => acc + (t.height || 0) + margin, 0)
        : 0;
    return offset;
    // return 0;
  }
}
