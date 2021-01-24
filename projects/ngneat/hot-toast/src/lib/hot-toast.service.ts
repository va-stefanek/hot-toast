import { Injectable, Optional } from '@angular/core';
import { ViewService } from '@ngneat/overview';
import { Observable } from 'rxjs';

import { HotToastContainerComponent } from './components/hot-toast-container/hot-toast-container.component';
import { HOT_TOAST_DEFAULT_TIMEOUTS } from './constants';
import { HotToastRef } from './hot-toast-ref';
import {
  CreateHotToastRef,
  DefaultToastOptions,
  HotToastServiceMethods,
  ObservableMessages,
  Toast,
  ToastConfig,
  ToastMessage,
  ToastOptions,
  ToastPersistConfig,
  ToastType,
} from './hot-toast.model';

@Injectable({ providedIn: 'root' })
export class HotToastService implements HotToastServiceMethods {
  private _defaultConfig = new ToastConfig();
  private _defaultPersistConfig = new ToastPersistConfig();
  componentInstance: HotToastContainerComponent;

  constructor(private viewService: ViewService, @Optional() config: ToastConfig) {
    if (config) {
      this._defaultConfig = {
        ...this._defaultConfig,
        ...config,
      };
    }
  }

  /**
   * Used for internal purpose only.
   * Creates a container component and attaches it to document.body.
   */
  init() {
    const componentRef = this.viewService
      .createComponent(HotToastContainerComponent)
      .setInput('defaultConfig', this._defaultConfig)
      .appendTo(document.body);

    this.componentInstance = componentRef.ref.instance;
  }

  private createToast<T>(
    message: ToastMessage,
    type: ToastType,
    options?: DefaultToastOptions,
    observable?: Observable<T>,
    observableMessages?: ObservableMessages<T>
  ): CreateHotToastRef {
    const now = Date.now();

    const id = options?.id ?? now.toString();

    if (!this.isDuplicate(id) && this.createStorage(id, options)) {
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
    return this.componentInstance.hasToast(id);
  }

  /**
   * Creates an entry in local or session storage with count ${defaultConfig.persist.count}, if not present.
   * If present in storage, reduces the count
   * and returns the count.
   * Count can not be less than 0.
   */
  private createStorage(id: string, options: DefaultToastOptions): number {
    let count = 1;
    if (options.persist?.enabled) {
      const persist = { ...this._defaultPersistConfig, ...options.persist };
      const storage: Storage = persist.storage === 'local' ? localStorage : sessionStorage;
      const key = persist.key.replace(/\${id}/g, id);

      let item: string | number = storage.getItem(key);

      if (item) {
        item = parseInt(item);
        if (item > 0) {
          count = item - 1;
        } else {
          count = item;
        }
      } else {
        count = persist.count;
      }

      storage.setItem(key, count.toString());
    }

    return count;
  }

  /**
   * Opens up an hot-toast without any pre-configurations
   *
   * @param {ToastMessage} message The message to show in the hot-toast.
   * @param {ToastOptions} [options] Additional configuration options for the hot-toast.
   * @returns {CreateHotToastRef}
   * @memberof HotToastService
   */
  show(message: ToastMessage, options?: ToastOptions): CreateHotToastRef {
    const toast = this.createToast(message, 'blank', { ...this._defaultConfig, ...options });

    return toast;
  }

  /**
   * Opens up an hot-toast with pre-configurations for error state
   *
   * @param {ToastMessage} message The message to show in the hot-toast.
   * @param {ToastOptions} [options] Additional configuration options for the hot-toast.
   * @returns {CreateHotToastRef}
   * @memberof HotToastService
   */
  error(message: ToastMessage, options?: ToastOptions): CreateHotToastRef {
    const toast = this.createToast(message, 'error', {
      ...this._defaultConfig,
      ...this._defaultConfig?.error,
      ...options,
    });

    return toast;
  }

  /**
   * Opens up an hot-toast with pre-configurations for success state
   *
   * @param {ToastMessage} message The message to show in the hot-toast.
   * @param {ToastOptions} [options] Additional configuration options for the hot-toast.
   * @returns {CreateHotToastRef}
   * @memberof HotToastService
   */
  success(message: ToastMessage, options?: ToastOptions): CreateHotToastRef {
    const toast = this.createToast(message, 'success', {
      ...this._defaultConfig,
      ...this._defaultConfig?.success,
      ...options,
    });

    return toast;
  }

  /**
   * Opens up an hot-toast with pre-configurations for loading state
   *
   * @param {ToastMessage} message The message to show in the hot-toast.
   * @param {ToastOptions} [options] Additional configuration options for the hot-toast.
   * @returns {CreateHotToastRef}
   * @memberof HotToastService
   */
  loading(message: ToastMessage, options?: ToastOptions): CreateHotToastRef {
    const toast = this.createToast(message, 'loading', {
      ...this._defaultConfig,
      ...this._defaultConfig?.loading,
      ...options,
    });

    return toast;
  }

  /**
   *
   *  Opens up an hot-toast with pre-configurations for loading initially and then changes state based on messages
   * @template T
   * @param {Observable<T>} observable Observable to which subscription will happen and messages will be displayed according to messages
   * @param {ObservableMessages<T>} messages Messages for each state i.e. loading, next and error
   * @param {DefaultToastOptions} [options] Additional configuration options for the hot-toast.
   * @returns {CreateHotToastRef}
   * @memberof HotToastService
   */
  observe<T>(
    observable: Observable<T>,
    messages: ObservableMessages<T>,
    options?: DefaultToastOptions
  ): CreateHotToastRef {
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
