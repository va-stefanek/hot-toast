import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Optional,
} from '@angular/core';
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
import { Observable } from 'rxjs';

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
    if (message === undefined) {
      throw Error('message is needed to create a hot-toast!');
    }
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
      ...this._defaultConfig.defaultToastOptions,
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
    const toast = this.makeToast(message, 'error', { ...this._defaultConfig.defaultToastOptions?.error, ...options });

    this.componentInstance.toasts.push(toast);

    return toast.id;
  }
  success(message: Renderable, options?: ToastOptions): string {
    const toast = this.makeToast(message, 'success', {
      ...this._defaultConfig.defaultToastOptions?.success,
      ...options,
    });

    this.componentInstance.toasts.push(toast);

    return toast.id;
  }
  loading(message: Renderable, options?: ToastOptions): string {
    const toast = this.makeToast(message, 'loading', {
      ...this._defaultConfig.defaultToastOptions?.loading,
      ...options,
    });

    this.componentInstance.toasts.push(toast);

    return toast.id;
  }
  observe<T>(observable: Observable<T>, messages: ObservableMessages<T>, options?: DefaultToastOptions): Observable<T> {
    let toast = this.makeToast(messages.loading || 'Loading...', 'loading', {
      ...options,
      ...this._defaultConfig.defaultToastOptions?.loading,
      ...options?.loading,
    });

    this.componentInstance.toasts.push(toast);

    observable.subscribe(
      (v) => {
        const height = toast.height;

        toast = this.makeToast(resolveValueOrFunction(messages.subscribe, v), 'success', {
          id: toast.id,
          ...options,
          ...this._defaultConfig.defaultToastOptions?.success,
          ...options?.success,
        });

        toast.height = height;

        const toastIndex = this.componentInstance.toasts.findIndex((t) => t.id === toast.id);

        this.componentInstance.toasts.splice(toastIndex, 1, toast);
      },
      (e) => {
        if (messages.error) {
          const height = toast.height;

          toast = this.makeToast(resolveValueOrFunction(messages.error, e), 'error', {
            id: toast.id,
            ...options,
            ...this._defaultConfig.defaultToastOptions?.error,
            ...options?.error,
          });

          toast.height = height;

          const toastIndex = this.componentInstance.toasts.findIndex((t) => t.id === toast.id);

          this.componentInstance.toasts.splice(toastIndex, 1, toast);
        }
      },
      () => {
        if (messages.complete) {
          const height = toast.height;

          toast = this.makeToast(messages.complete, 'success', {
            id: toast.id,
            ...options,
            ...this._defaultConfig.defaultToastOptions?.error,
            ...options?.error,
          });

          toast.height = height;

          const toastIndex = this.componentInstance.toasts.findIndex((t) => t.id === toast.id);

          this.componentInstance.toasts.splice(toastIndex, 1, toast);
        }
      }
    );

    return observable;
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
