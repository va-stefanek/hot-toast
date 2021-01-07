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
  Renderable,
  resolveValueOrFunction,
  Toast,
  ToastConfig,
  ToastOptions,
  ToastRef,
  ToastType,
  UpdateToastOptions,
} from './hot-toast.model';
import { HotToastComponent } from './hot-toast.component';
import { Observable, Subscription } from 'rxjs';

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

  private makeToast<T>(
    message: Renderable,
    type: ToastType,
    options?: ToastOptions,
    subscription?: Subscription
  ): ToastRef {
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

    this.componentInstance.toasts.push(toast);

    const that = this;

    let toastRef: ToastRef = {
      close() {
        if (subscription) {
          subscription.unsubscribe();
        }
        toast.visible = false;
        const toastIndex = that.componentInstance.toasts.findIndex((t) => t.id === toast.id);
        that.componentInstance.toasts.splice(toastIndex, 1, toast);
        setTimeout(() => {
          if (that.componentInstance.toasts[toastIndex].id === toast.id) {
            that.componentInstance.toasts.splice(toastIndex, 1);
          }
        }, 1000);
      },
      updateMessage(message: Renderable) {
        toast.message = message;
      },
      updateToast(options: UpdateToastOptions) {
        toast = Object.assign(toast, options);
      },
      unsubscribe() {
        if (subscription) {
          subscription.unsubscribe();
        }
      },
    };

    return toastRef;
  }

  show(message: Renderable, options?: ToastOptions) {
    const toast = this.makeToast(message, 'blank', options);

    return toast;
  }

  error(message: Renderable, options?: ToastOptions) {
    const toast = this.makeToast(message, 'error', { ...this._defaultConfig.defaultToastOptions?.error, ...options });

    return toast;
  }
  success(message: Renderable, options?: ToastOptions) {
    const toast = this.makeToast(message, 'success', {
      ...this._defaultConfig.defaultToastOptions?.success,
      ...options,
    });

    return toast;
  }
  loading(message: Renderable, options?: ToastOptions) {
    const toast = this.makeToast(message, 'loading', {
      ...this._defaultConfig.defaultToastOptions?.loading,
      ...options,
    });

    return toast;
  }
  observe<T>(observable: Observable<T>, messages: ObservableMessages<T>, options?: DefaultToastOptions) {
    let toastRef = this.makeToast(
      messages.loading || 'Loading...',
      'loading',
      {
        ...options,
        ...this._defaultConfig.defaultToastOptions?.loading,
        ...options?.loading,
      },
      observable.subscribe(
        (v) => {
          toastRef.updateMessage(resolveValueOrFunction(messages.subscribe, v));
          toastRef.updateToast({
            type: 'success',
            duration: HOT_TOAST_DEFAULT_TIMEOUTS['success'],
            ...this._defaultConfig.defaultToastOptions?.success,
            ...options?.success,
          });
        },
        (e) => {
          if (messages.error) {
            toastRef.updateMessage(resolveValueOrFunction(messages.error, e));
            toastRef.updateToast({
              type: 'error',
              duration: HOT_TOAST_DEFAULT_TIMEOUTS['error'],
              ...this._defaultConfig.defaultToastOptions?.error,
              ...options?.error,
            });
          }
        },
        () => {
          if (messages.complete) {
            toastRef.updateMessage(resolveValueOrFunction(messages.complete, undefined));
            toastRef.updateToast({
              type: 'success',
              duration: HOT_TOAST_DEFAULT_TIMEOUTS['success'],
              ...this._defaultConfig.defaultToastOptions?.success,
              ...options?.success,
            });
          }
        }
      )
    );

    return toastRef;
  }
}
