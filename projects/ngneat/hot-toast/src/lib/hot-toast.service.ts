import { Injectable, Optional } from '@angular/core';
import { Content, ViewService } from '@ngneat/overview';
import { UpdateToastOptions } from 'dist/ngneat/hot-toast/public-api';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
   * @param {Content} message The message to show in the hot-toast.
   * @param {ToastOptions} [options] Additional configuration options for the hot-toast.
   * @returns {CreateHotToastRef}
   * @memberof HotToastService
   */
  show(message: Content, options?: ToastOptions): CreateHotToastRef {
    const toast = this.createToast(message, 'blank', { ...this._defaultConfig, ...options });

    return toast;
  }

  /**
   * Opens up an hot-toast with pre-configurations for error state
   *
   * @param {Content} message The message to show in the hot-toast.
   * @param {ToastOptions} [options] Additional configuration options for the hot-toast.
   * @returns {CreateHotToastRef}
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
   * @param {Content} message The message to show in the hot-toast.
   * @param {ToastOptions} [options] Additional configuration options for the hot-toast.
   * @returns {CreateHotToastRef}
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
   * @param {Content} message The message to show in the hot-toast.
   * @param {ToastOptions} [options] Additional configuration options for the hot-toast.
   * @returns {CreateHotToastRef}
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
   *
   *  Opens up an hot-toast with pre-configurations for loading initially and then changes state based on messages
   * @template T
   * @param {ObservableMessages<T>} messages Messages for each state i.e. loading, next and error
   * @param {DefaultToastOptions} [options] Additional configuration options for the hot-toast.
   * @param {Observable<T>} observable Observable to which subscription will happen and messages will be displayed according to messages
   * @returns {CreateHotToastRef}
   * @memberof HotToastService
   */
  observe<T>(
    messages: ObservableMessages<T>,
    options?: DefaultToastOptions
  ): <T>(source: Observable<T>) => Observable<T | ((error: any) => void)>;
  observe<T>(
    messages: ObservableMessages<T>,
    options?: DefaultToastOptions,
    observable?: Observable<T>
  ): CreateHotToastRef;
  observe<T>(
    messages: ObservableMessages<T>,
    options?: DefaultToastOptions,
    observable?: Observable<T>
  ): CreateHotToastRef | (<T>(source: Observable<T>) => Observable<T | ((error: any) => void)>) {
    if (observable) {
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
    return (source) => {
      const toastRef = this.createToast(messages.loading || 'Loading...', 'loading', {
        ...this._defaultConfig,
        ...this._defaultConfig?.loading,
        ...options,
        ...options?.loading,
      });
      return source.pipe(
        tap(
          (next) => {
            if (messages.next) {
              const message = resolveValueOrFunction(messages.next, next as unknown);
              toastRef.updateMessage(message);
              const options: UpdateToastOptions = {
                ...toastRef.getToast(),
                type: 'success',
                duration: HOT_TOAST_DEFAULT_TIMEOUTS['success'],
                ...this._defaultConfig?.success,
                ...(toastRef.getToast() as DefaultToastOptions)?.success,
              };
              toastRef.updateToast(options);
            }
          },
          (error) => {
            if (messages.error) {
              const message = resolveValueOrFunction(messages.error, error as unknown);
              toastRef.updateMessage(message);
              const options: UpdateToastOptions = {
                ...toastRef.getToast(),
                type: 'error',
                duration: HOT_TOAST_DEFAULT_TIMEOUTS['error'],
                ...this._defaultConfig?.error,
                ...(toastRef.getToast() as DefaultToastOptions)?.error,
              };
              toastRef.updateToast(options);
            }
          }
        ),

        // if we don't keep catchError, we get following error:
        // Cannot read property 'ngOriginalError' of undefined
        catchError((error) => of(error))
      );
    };
  }
}
