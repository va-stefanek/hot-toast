import { Injectable, Optional } from '@angular/core';
import { Content, ViewService } from '@ngneat/overview';
import { Observable } from 'rxjs';

import { HotToastContainerComponent } from './components/hot-toast-container/hot-toast-container.component';
import { HOT_TOAST_DEFAULT_TIMEOUTS } from './constants';
import { HotToastRef } from './hot-toast-ref';
import {
  DefaultToastOptions,
  HotToastServiceMethods,
  ObservableMessages,
  Toast,
  ToastConfig,
  ToastOptions,
  ToastType,
} from './hot-toast.model';

@Injectable({ providedIn: 'root' })
export class HotToastService implements HotToastServiceMethods {
  private _defaultConfig = new ToastConfig();
  componentInstance: HotToastContainerComponent;

  constructor(private viewService: ViewService, @Optional() config: ToastConfig) {
    if (config) {
      this._defaultConfig = { ...this._defaultConfig, ...config };
    }
  }

  init() {
    const componentRef = this.viewService
      .createComponent(HotToastContainerComponent)
      .setInput('defaultConfig', this._defaultConfig)
      .appendTo(document.body);

    this.componentInstance = componentRef.ref.instance;
  }

  private createToast<T>(
    message: Content,
    type: ToastType,
    options?: DefaultToastOptions,
    observable?: Observable<T>,
    observableMessages?: ObservableMessages<T>
  ): HotToastRef {
    const now = Date.now();

    const toast: Toast = {
      ariaLive: options?.ariaLive ?? 'polite',
      createdAt: now,
      duration: options?.duration ?? HOT_TOAST_DEFAULT_TIMEOUTS[type],
      id: options?.id ?? now.toString(),
      message,
      role: options?.role ?? 'status',
      type,
      visible: true,
      observable: observable ?? undefined,
      observableMessages: observableMessages ?? undefined,
      ...options,
    };

    if (this.componentInstance.hasToast(toast.id)) {
      throw new Error('Could not open toast, as another one is present with same id: ' + toast.id);
    }

    return new HotToastRef(toast).appendTo(this.componentInstance);
  }

  show(message: Content, options?: ToastOptions) {
    const toast = this.createToast(message, 'blank', { ...this._defaultConfig, ...options });

    return toast;
  }

  error(message: Content, options?: ToastOptions) {
    const toast = this.createToast(message, 'error', {
      ...this._defaultConfig,
      ...this._defaultConfig?.error,
      ...options,
    });

    return toast;
  }
  success(message: Content, options?: ToastOptions) {
    const toast = this.createToast(message, 'success', {
      ...this._defaultConfig,
      ...this._defaultConfig?.success,
      ...options,
    });

    return toast;
  }
  loading(message: Content, options?: ToastOptions) {
    const toast = this.createToast(message, 'loading', {
      ...this._defaultConfig,
      ...this._defaultConfig?.loading,
      ...options,
    });

    return toast;
  }
  observe<T>(observable: Observable<T>, messages: ObservableMessages<T>, options?: DefaultToastOptions) {
    let toastRef = this.createToast(
      messages.loading || 'Loading...',
      'loading',
      {
        ...this._defaultConfig,
        ...this._defaultConfig?.loading,
        ...options,
        ...options?.loading,
      },
      observable,
      messages
    );

    return toastRef;
  }
}
