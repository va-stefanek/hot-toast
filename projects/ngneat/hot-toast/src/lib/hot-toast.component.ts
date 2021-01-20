import {
  ComponentFactoryResolver,
  ContentChildren,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Component, QueryList } from '@angular/core';
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

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

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
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<HotToastBaseComponent>(
      HotToastBaseComponent
    );

    const componentRef = this.toastBaseList.createComponent<HotToastBaseComponent>(componentFactory);

    // 4. component inputs
    componentRef.instance.defaultConfig = this.defaultConfig;
    componentRef.instance.offset = this.calculateOffset(toast.id, toast.position);
    componentRef.instance.toast = toast;

    // 5. component methods
    componentRef.instance.makeToastRef();
    componentRef.instance.checkForObserve();

    // 6. component outputs
    componentRef.instance.onHeight.subscribe((newHeight: number) => {
      toast.height = newHeight;
      this.updateHeightSub.next();
    });
    componentRef.instance.onWidth.subscribe((newWidth: number) => {
      toast.width = newWidth;
    });
    componentRef.instance.remove.subscribe(() => {
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
    componentRef.instance.generateTimeout();

    // 8. update offset of toast
    const sub = [
      this.updateHeight$.subscribe(() => {
        componentRef.instance.offset = this.calculateOffset(toast.id, toast.position);
      }),
    ];

    this.subscriptionList = this.subscriptionList.concat(sub);

    return componentRef.instance.toastRef;
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((s) => s.unsubscribe());
  }
}
