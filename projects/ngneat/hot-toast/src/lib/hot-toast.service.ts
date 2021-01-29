import { Injectable, Optional } from '@angular/core';
import { CompRef, Content, isComponent, isTemplateRef, ViewService } from '@ngneat/overview';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HotToastContainerComponent } from './components/hot-toast-container/hot-toast-container.component';
import { HOT_TOAST_DEFAULT_TIMEOUTS } from './constants';
import { HotToastRef } from './hot-toast-ref';
import {
  CreateHotToastRef,
  DefaultToastOptions,
  HotToastServiceMethods,
  ObservableLoading,
  ObservableMessages,
  ObservableSuccessOrError,
  resolveValueOrFunction,
  Toast,
  ToastConfig,
  ToastOptions,
  ToastPersistConfig,
  ToastType,
  UpdateToastOptions,
  ValueOrFunction,
} from './hot-toast.model';

@Injectable({ providedIn: 'root' })
export class HotToastService implements HotToastServiceMethods {
  private _componentRef: CompRef<HotToastContainerComponent>;

  private _defaultConfig = new ToastConfig();
  get defaultConfig() {
    return this._defaultConfig;
  }
  set defaultConfig(config: ToastConfig) {
    this._defaultConfig = {
      ...this._defaultConfig,
      ...config,
    };
    this._componentRef.setInput('defaultConfig', this._defaultConfig);
  }
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
    this._componentRef = this._viewService
      .createComponent(HotToastContainerComponent)
      .setInput('defaultConfig', this._defaultConfig)
      .appendTo(document.body);
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
   * @template T Type of observable
   * @param messages Messages for each state i.e. loading, success and error
   * @returns
   * @memberof HotToastService
   */
  observe<T>(messages: ObservableMessages<T>): (source: Observable<T>) => Observable<T> {
    return (source) => {
      let toastRef: CreateHotToastRef;

      if (messages.loading) {
        toastRef = this.createLoadingToast<T>(messages.loading);
      }

      return source.pipe(
        tap({
          next: (val) => {
            toastRef = this.createOrUpdateToast(messages, val, toastRef, 'success');
          },
          error: (e) => {
            if (messages.error) {
              toastRef = this.createOrUpdateToast(messages, e, toastRef, 'error');
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
    this._componentRef.ref.instance.closeToast(id);
  }

  private createOrUpdateToast<T>(
    messages: ObservableMessages<T>,
    val: unknown,
    toastRef: CreateHotToastRef,
    type: ToastType
  ) {
    let content: Content | ValueOrFunction<Content, T> = null;
    let options: ToastOptions = {};
    ({ content, options } = this.getContentAndOptions<any>(type, messages[type]));
    content = resolveValueOrFunction(content, val);
    if (toastRef) {
      toastRef.updateMessage(content);
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
      this.createToast(content, type, newOptions);
    }
    return toastRef;
  }

  private createToast<T>(
    message: Content,
    type: ToastType,
    options?: DefaultToastOptions,
    observableMessages?: ObservableMessages<T>
  ): CreateHotToastRef {
    const now = Date.now();
    const id = options?.id ?? now.toString();

    if (
      !this.isDuplicate(id) &&
      (!options.persist?.enabled || (options.persist?.enabled && this.handleStorageValue(id, options)))
    ) {
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

      return new HotToastRef(toast).appendTo(this._componentRef.ref.instance);
    }
  }

  /**
   * Checks whether any toast with same id is present.
   *
   * @private
   * @param id - Toast ID
   */
  private isDuplicate(id: string) {
    return this._componentRef.ref.instance.hasToast(id);
  }

  /**
   * Creates an entry in local or session storage with count ${defaultConfig.persist.count}, if not present.
   * If present in storage, reduces the count
   * and returns the count.
   * Count can not be less than 0.
   */
  private handleStorageValue(id: string, options: DefaultToastOptions): number {
    let count = 1;
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

    return count;
  }

  private getContentAndOptions<T>(
    toastType: ToastType,
    message: Content | ValueOrFunction<Content, T> | ObservableSuccessOrError<T>
  ) {
    let content: Content | ValueOrFunction<Content, T>;
    let options: ToastOptions = {
      ...this._defaultConfig,
      ...this._defaultConfig[toastType],
    };

    // typeof message === 'object' won't work, cz TemplateRef's type is object
    if (typeof message === 'string' || isTemplateRef(message) || isComponent(message)) {
      content = message;
    } else {
      let restOptions: ToastOptions;
      ({ content, ...restOptions } = message as ObservableLoading);
      options = { ...options, ...restOptions };
    }

    return { content, options };
  }

  private createLoadingToast<T>(messages: Content | ObservableLoading) {
    let content: Content | ValueOrFunction<Content, T> = null;
    let options: ToastOptions = {
      ...this._defaultConfig,
      ...this._defaultConfig?.loading,
    };

    ({ content, options } = this.getContentAndOptions<any>('loading', messages));

    return this.loading(content as Content, options);
  }
}
