import {
  ComponentFactoryResolver,
  ContentChildren,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Component, QueryList } from '@angular/core';
import { ViewService } from '@ngneat/overview';
import { Observable, Subject, Subscription } from 'rxjs';
import { HotToastBaseComponent } from './components/hot-toast-base/hot-toast-base.component';
import { HOT_TOAST_DEFAULT_TIMEOUTS } from './constants';
import {
  DefaultToastOptions,
  ObservableMessages,
  Renderable,
  Toast,
  ToastConfig,
  ToastPosition,
  ToastRef,
  ToastType,
} from './hot-toast.model';

@Component({
  selector: 'hot-toast',
  templateUrl: './hot-toast.component.html',
})
export class HotToastComponent implements OnDestroy {
  @Input() defaultConfig: ToastConfig;

  toasts: Toast[] = [];

  private readonly offsetMargin = 8;

  @ContentChildren(HotToastBaseComponent) hotToastList: QueryList<HotToastBaseComponent>;
  @ViewChild('toastBaseList', { read: ViewContainerRef }) toastBaseList: ViewContainerRef;

  updateHeightSub = new Subject();
  updateHeight$ = this.updateHeightSub.asObservable();
  subscriptionList: Subscription[] = [];

  constructor(private viewService: ViewService) {}

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
            .reduce((acc, t) => acc + (t.height || 0) + this.offsetMargin, 0)
        : 0;
    return offset;
  }

  makeToast<T>(
    message: Renderable,
    type: ToastType,
    options?: DefaultToastOptions,
    observable?: Observable<T>,
    observableMessages?: ObservableMessages<T>
  ): ToastRef {
    // 1. create toast
    const now = Date.now();

    let toast: Toast = {
      ariaLive: options?.ariaLive ?? 'polite',
      createdAt: now,
      duration: options?.duration ?? HOT_TOAST_DEFAULT_TIMEOUTS[type],
      id: options?.id ?? now.toString(),
      message,
      pauseDuration: 0,
      role: options?.role ?? 'status',
      type,
      visible: true,
      observable: observable ?? undefined,
      observableMessages: observableMessages ?? undefined,
      ...options,
    };

    // 2. push to toasts array
    this.toasts.push(toast);

    // 3. create component
    const componentRef = this.viewService.createComponent(HotToastBaseComponent, { vcr: this.toastBaseList });

    // 4. component inputs
    componentRef.setInputs({
      defaultConfig: this.defaultConfig,
      offset: this.calculateOffset(toast.id, toast.position),
      toast,
    });

    // 5. component methods
    componentRef.ref.instance.makeToastRef();
    componentRef.ref.instance.checkForObserve();

    // 6. component outputs
    componentRef.ref.instance.onHeight.subscribe((newHeight: number) => {
      toast.height = newHeight;
      this.updateHeightSub.next();
    });
    componentRef.ref.instance.onWidth.subscribe((newWidth: number) => {
      toast.width = newWidth;
    });
    componentRef.ref.instance.remove.subscribe(() => {
      this.updateHeightSub.next();
      setTimeout(() => {
        componentRef.destroy();
        sub.forEach((s) => s.unsubscribe());
        this.toasts.splice(
          this.toasts.findIndex((t) => t.id === toast.id),
          1
        );
      }, 1000);
    });

    // 7. auto hide toast
    componentRef.ref.instance.generateTimeout();

    // 8. update offset of toast
    const sub = [
      this.updateHeight$.subscribe(() => {
        componentRef.ref.instance.offset = this.calculateOffset(toast.id, toast.position);
      }),
    ];

    this.subscriptionList = this.subscriptionList.concat(sub);

    return componentRef.ref.instance.toastRef;
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((s) => s.unsubscribe());
  }
}
