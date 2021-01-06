import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Optional,
} from '@angular/core';
import { from, Observable, scheduled } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { HOT_TOAST_DEFAULT_TIMEOUTS } from './constants';
import {
  DefaultToastOptions,
  HotToastServiceMethods,
  ObservableMessages,
  PromiseMessage,
  Renderable,
  resolveValueOrFunction,
  Toast,
  ToastConfig,
  ToastOptions,
  ToastType,
} from './hot-toast.model';
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

  private makeToast(message: Renderable, type: ToastType, options?: ToastOptions): Toast {
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

  show(message: Renderable, options?: ToastOptions): string {
    const toast = this.makeToast(message, 'blank', options);

    this.componentInstance.toasts.push(toast);

    return toast.id;
  }

  error(message: Renderable, options?: ToastOptions): string {
    const toast = this.makeToast(message, 'error', options);

    this.componentInstance.toasts.push(toast);

    return toast.id;
  }
  success(message: Renderable, options?: ToastOptions): string {
    const toast = this.makeToast(message, 'success', options);

    this.componentInstance.toasts.push(toast);

    return toast.id;
  }
  loading(message: Renderable, options?: ToastOptions): string {
    const toast = this.makeToast(message, 'loading', options);

    this.componentInstance.toasts.push(toast);

    return toast.id;
  }
  promise<T>(promise: Promise<T>, messages: PromiseMessage<T>, options?: DefaultToastOptions): Promise<T> {
    let toast = this.makeToast(messages.loading, 'loading', { ...options, ...options?.loading });

    this.componentInstance.toasts.push(toast);

    promise
      .then((p) => {
        toast = this.makeToast(resolveValueOrFunction(messages.success, p), 'success', {
          id: toast.id,
          ...options,
          ...options?.success,
        });

        const toastIndex = this.componentInstance.toasts.findIndex((t) => t.id === toast.id);

        this.componentInstance.toasts.splice(toastIndex, 1, toast);

        return p;
      })
      .catch((e) => {
        toast = this.makeToast(resolveValueOrFunction(messages.error, e), 'error', {
          id: toast.id,
          ...options,
          ...options?.error,
        });

        const toastIndex = this.componentInstance.toasts.findIndex((t) => t.id === toast.id);

        this.componentInstance.toasts.splice(toastIndex, 1, toast);
      });

    return promise;
  }

  hide(toastId: string) {
    const toastIndex = this.componentInstance.toasts.findIndex((t) => t.id === toastId);

    if (toastIndex > -1) {
      const toast = this.componentInstance.toasts[toastIndex];
      toast.visible = false;
      this.componentInstance.toasts.splice(toastIndex, 1, toast);
      setTimeout(() => {
        if (this.componentInstance.toasts[toastIndex].id === toastId) {
          this.componentInstance.toasts.splice(toastIndex, 1);
        }
      }, 1000);
    }
  }
}
