import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Optional,
} from '@angular/core';
import { Observable } from 'rxjs';
import { HOT_TOAST_DEFAULT_TIMEOUTS } from './constants';
import {
  HotToastServiceMethods,
  ObservableMessages,
  PromiseMessage,
  Toast,
  ToastConfig,
  ToastOptions,
  ToastType,
} from './hot-tast.model';
import { HotToastComponent } from './hot-toast.component';

@Injectable()
export class HotToastService implements HotToastServiceMethods {
  private _defaultConfig = new ToastConfig();
  componentInstance: HotToastComponent;

  constructor(private injector: Injector, @Optional() config: ToastConfig) {
    if (config) {
      this._defaultConfig = { ...this._defaultConfig, ...config };
    }
  }

  init() {
    const appRef = this.injector.get(ApplicationRef);
    const componentFactoryResolver = this.injector.get(ComponentFactoryResolver);

    const componentRef = componentFactoryResolver.resolveComponentFactory(HotToastComponent).create(this.injector);

    componentRef.instance.position = this._defaultConfig.position;
    componentRef.instance.reverseOrder = this._defaultConfig.reverseOrder;

    this.componentInstance = componentRef.instance;

    appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  private makeToast(message: string, type: ToastType, options?: ToastOptions): Toast {
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
      ...options,
    };
    return toast;
  }

  show(message: string, options?: ToastOptions): string {
    const toast = this.makeToast(message, 'blank', options);

    this.componentInstance.toasts.push(toast);

    return toast.id;
  }

  error(message: string, options?: ToastOptions): string {
    const toast = this.makeToast(message, 'error', options);

    this.componentInstance.toasts.push(toast);

    return toast.id;
  }
  success(message: string, options?: ToastOptions): string {
    const toast = this.makeToast(message, 'success', options);

    this.componentInstance.toasts.push(toast);

    return toast.id;
  }
  loading(message: string, options?: ToastOptions): string {
    const toast = this.makeToast(message, 'loading', options);

    this.componentInstance.toasts.push(toast);

    return toast.id;
  }
  promise: <T>(promise: Promise<T>, messages: PromiseMessage<T>, options?: ToastOptions) => string;
  observable: <T>(observable: Observable<T>, messages: ObservableMessages<T>, options?: ToastOptions) => string;
  hide: (toastId: string) => void;
}
