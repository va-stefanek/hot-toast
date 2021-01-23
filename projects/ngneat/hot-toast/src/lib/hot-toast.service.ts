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
  ToastPersistConfig,
  ToastType,
} from './hot-toast.model';

declare const ngDevMode: boolean;

@Injectable({ providedIn: 'root' })
export class HotToastService implements HotToastServiceMethods {
  private _defaultConfig = new ToastConfig();
  private _defaultPersistConfig = new ToastPersistConfig();
  private _error: string;
  componentInstance: HotToastContainerComponent;

  constructor(private viewService: ViewService, @Optional() config: ToastConfig) {
    if (config) {
      if (config.persist?.enabled) {
        this._defaultPersistConfig = {
          ...this._defaultPersistConfig,
          ...config.persist,
        };
      }

      this._defaultConfig = {
        ...this._defaultConfig,
        ...config,
        debug: (typeof ngDevMode === 'undefined' || ngDevMode) && config.debug,
        persist: this._defaultPersistConfig,
      };
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

    const id = options?.id ?? now.toString();

    if (this.isDuplicate(id) || !this.createStorage(id)) {
      if (this._defaultConfig.debug) {
        throw new Error(this._error);
      }
    } else {
      const toast: Toast = {
        ariaLive: options?.ariaLive ?? 'polite',
        createdAt: now,
        duration: options?.duration ?? HOT_TOAST_DEFAULT_TIMEOUTS[type],
        id,
        message,
        role: options?.role ?? 'status',
        type,
        visible: true,
        observable: observable ?? undefined,
        observableMessages: observableMessages ?? undefined,
        ...options,
      };

      return new HotToastRef(toast).appendTo(this.componentInstance);
    }
  }

  private isDuplicate(id: string) {
    this._error = `Could not open toast, because another one is present with same id: ${id}.`;
    return this.componentInstance.hasToast(id);
  }

  /**
   * Creates an entry in local or session storage with count ${defaultConfig.persist.count}, if not present.
   * If present in storage, reduces the count
   * and returns the count.
   * Count can not be less than 0.
   */
  private createStorage(id: string): number {
    let count = 1;
    if (this._defaultConfig.persist?.enabled) {
      const persist = this._defaultConfig.persist;
      const storage: Storage = persist.storage === 'local' ? localStorage : sessionStorage;
      const key = persist.key.replace(/\${id}/g, id);

      let item: string | number = storage.getItem(key);

      if (item) {
        item = parseInt(item);
        if (item > 0) {
          count = item - 1;
        } else {
          this._error = `Could not create toast, because remaining count is zero in ${persist.storage}Storage for it's corresponding key, i.e. ${key}.`;
          count = item;
        }
      } else {
        count = persist.count;
      }

      storage.setItem(key, count.toString());
    }

    return count;
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
