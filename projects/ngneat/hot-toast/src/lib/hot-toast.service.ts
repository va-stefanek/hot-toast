import { Injectable, Optional } from '@angular/core';
import { Content, ViewService } from '@ngneat/overview';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HotToastContainerComponent } from './components/hot-toast-container/hot-toast-container.component';
import { HOT_TOAST_DEFAULT_TIMEOUTS } from './constants';
import { HotToastRef } from './hot-toast-ref';
import {
  CreateHotToastRef,
  DefaultToastOptions,
  HotToastServiceMethods,
  ObservableMessages,
  resolveValueOrFunction,
  Toast,
  ToastConfig,
  ToastOptions,
  ToastPersistConfig,
  ToastType,
  UpdateToastOptions,
} from './hot-toast.model';

@Injectable({ providedIn: 'root' })
export class HotToastService implements HotToastServiceMethods {
  componentInstance: HotToastContainerComponent;

  private _defaultConfig = new ToastConfig();
  private _defaultPersistConfig = new ToastPersistConfig();

  constructor(private _viewService: ViewService, @Optional() config: ToastConfig) {
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
    const componentRef = this._viewService
      .createComponent(HotToastContainerComponent)
      .setInput('defaultConfig', this._defaultConfig)
      .appendTo(this._defaultConfig.windowRef.document.body);

    this.componentInstance = componentRef.ref.instance;
  }

  /**
   * Opens up an hot-toast without any pre-configurations
   *
   * @param message The message to show in the hot-toast.
   * @param [options] Additional configuration options for the hot-toast.
   * @returns
   * @memberof HotToastService
   */
  show(message: Content, options?: ToastOptions): CreateHotToastRef {
    const toast = this.createToast(message, 'blank', { ...this._defaultConfig, ...options });

    return toast;
  }

  /**
   * Opens up an hot-toast with pre-configurations for error state
   *
   * @param message The message to show in the hot-toast.
   * @param [options] Additional configuration options for the hot-toast.
   * @returns
   * @memberof HotToastService
   */
  error(message: Content, options?: ToastOptions): CreateHotToastRef {
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
   * @param message The message to show in the hot-toast.
   * @param [options] Additional configuration options for the hot-toast.
   * @returns
   * @memberof HotToastService
   */
  success(message: Content, options?: ToastOptions): CreateHotToastRef {
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
   * @param message The message to show in the hot-toast.
   * @param [options] Additional configuration options for the hot-toast.
   * @returns
   * @memberof HotToastService
   */
  loading(message: Content, options?: ToastOptions): CreateHotToastRef {
    const toast = this.createToast(message, 'loading', {
      ...this._defaultConfig,
      ...this._defaultConfig?.loading,
      ...options,
    });

    return toast;
  }

  /**
   * Opens up an hot-toast with pre-configurations for warning state
   *
   * @param message The message to show in the hot-toast.
   * @param [options] Additional configuration options for the hot-toast.
   * @returns
   * @memberof HotToastService
   */
  warning(message: Content, options?: ToastOptions): CreateHotToastRef {
    const toast = this.createToast(message, 'warning', {
      ...this._defaultConfig,
      ...this._defaultConfig?.warning,
      ...options,
    });

    return toast;
  }

  /**
   *
   *  Opens up an hot-toast with pre-configurations for loading initially and then changes state based on messages
   *
   * @template T T
   * @param messages Messages for each state i.e. loading, next and error
   * @param [options] Additional configuration options for the hot-toast.
   * @param observable Observable to which subscription will happen and messages will be displayed according to messages
   * @returns
   * @memberof HotToastService
   */
  observe<T>(messages: ObservableMessages<T>, options?: DefaultToastOptions): (source: Observable<T>) => Observable<T> {
    return (source) => {
      let toastRef: CreateHotToastRef;
      if (messages.loading) {
        toastRef = this.createToast(messages.loading, 'loading', {
          ...this._defaultConfig,
          ...this._defaultConfig?.loading,
          ...options,
          ...options?.loading,
        });
      }

      return source.pipe(
        tap({
          next: (val) => {
            if (messages.next) {
              toastRef = this.createOrUpdateToast(messages, val, toastRef, options, 'success');
            }
          },
          error: (e) => {
            if (messages.error) {
              toastRef = this.createOrUpdateToast(messages, e, toastRef, options, 'error');
            }
          },
        })
      );
    };
  }

  /**
   * Closes the hot-toast
   *
   * @param id - ID of the toast
   */
  close(id: string) {
    this.componentInstance.closeToast(id);
  }

  private createOrUpdateToast<T>(
    messages: ObservableMessages<T>,
    val: unknown,
    toastRef: CreateHotToastRef,
    options: DefaultToastOptions,
    type: ToastType
  ) {
    const message = resolveValueOrFunction(messages[type === 'success' ? 'next' : 'error'], val);
    if (toastRef) {
      toastRef.updateMessage(message);
      const updatedOptions: UpdateToastOptions = {
        ...toastRef.getToast(),
        type,
        duration: HOT_TOAST_DEFAULT_TIMEOUTS[type],
        ...(this._defaultConfig[type] ?? undefined),
        ...((toastRef.getToast() as DefaultToastOptions)[type] ?? {}),
      };
      toastRef.updateToast(updatedOptions);
    } else {
      const newOptions = {
        ...this._defaultConfig,
        ...(this._defaultConfig[type] ?? undefined),
        ...options,
        ...(options && options[type] ? options[type] : undefined),
      };
      this.createToast(message, type, newOptions);
    }
    return toastRef;
  }

  private createToast<T>(
    message: Content,
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
        item = parseInt(item, 10);
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
}
