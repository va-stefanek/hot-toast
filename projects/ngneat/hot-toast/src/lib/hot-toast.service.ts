import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Optional,
} from '@angular/core';
import {
  DefaultToastOptions,
  HotToastServiceMethods,
  ObservableMessages,
  Renderable,
  ToastConfig,
  ToastOptions,
  ToastRef,
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

    componentRef.instance.reverseOrder = this._defaultConfig.reverseOrder;

    this.componentInstance = componentRef.instance;

    this.componentInstance.defaultConfig = this._defaultConfig;

    appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  private makeToast<T>(
    message: Renderable,
    type: ToastType,
    options?: DefaultToastOptions,
    observable?: Observable<T>,
    observableMessages?: ObservableMessages<T>
  ): ToastRef {
    if (message === undefined) {
      throw Error('message is needed to create a hot-toast!');
    }

    const toastRef = this.componentInstance.makeToast<T>(message, type, options, observable, observableMessages);

    return toastRef;
  }

  show(message: Renderable, options?: ToastOptions) {
    const toast = this.makeToast(message, 'blank', { ...this._defaultConfig, ...options });

    return toast;
  }

  error(message: Renderable, options?: ToastOptions) {
    const toast = this.makeToast(message, 'error', {
      ...this._defaultConfig?.error,
      ...this._defaultConfig,
      ...options,
    });

    return toast;
  }
  success(message: Renderable, options?: ToastOptions) {
    const toast = this.makeToast(message, 'success', {
      ...this._defaultConfig?.success,
      ...this._defaultConfig,
      ...options,
    });

    return toast;
  }
  loading(message: Renderable, options?: ToastOptions) {
    const toast = this.makeToast(message, 'loading', {
      ...this._defaultConfig?.loading,
      ...this._defaultConfig,
      ...options,
    });

    return toast;
  }
  observe<T>(observable: Observable<T>, messages: ObservableMessages<T>, options?: DefaultToastOptions) {
    let toastRef = this.makeToast(
      messages.loading || 'Loading...',
      'loading',
      {
        ...this._defaultConfig,
        ...options,
        ...this._defaultConfig?.loading,
        ...options?.loading,
      },
      observable,
      messages
    );

    return toastRef;
  }
}
