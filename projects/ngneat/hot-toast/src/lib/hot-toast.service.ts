import { Injectable, Optional } from '@angular/core';
import { ViewService } from '@ngneat/overview';
import { Observable } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class HotToastService implements HotToastServiceMethods {
  private _defaultConfig = new ToastConfig();
  componentInstance: HotToastComponent;

  constructor(private viewService: ViewService, @Optional() config: ToastConfig) {
    if (config) {
      this._defaultConfig = { ...this._defaultConfig, ...config };
    }
  }

  init() {
    const componentRef = this.viewService
      .createComponent(HotToastComponent)
      .setInput('defaultConfig', this._defaultConfig)
      .appendTo(document.body);

    this.componentInstance = componentRef.ref.instance;
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
