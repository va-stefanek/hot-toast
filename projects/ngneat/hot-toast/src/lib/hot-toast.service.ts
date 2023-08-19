import { isPlatformServer } from '@angular/common';
import {Inject, Injectable, Optional, PLATFORM_ID} from '@angular/core';
import { CompRef, Content, isComponent, isTemplateRef, ViewService } from '@ngneat/overview';
import { defer, Observable } from 'rxjs';
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

@Injectable()
export class HotToastService implements HotToastServiceMethods {
  private _isInitialized = false;
  private _componentRef: CompRef<HotToastContainerComponent>;

  private _defaultConfig = new ToastConfig();
  private _defaultPersistConfig = new ToastPersistConfig();

  constructor(
    private _viewService: ViewService,
    @Inject(PLATFORM_ID) private platformId: string,
    @Optional() config: ToastConfig
  ) {
    if (config) {
      this._defaultConfig = {
        ...this._defaultConfig,
        ...config,
      };
    }
  }

  get defaultConfig() {
    return this._defaultConfig;
  }
  set defaultConfig(config: ToastConfig) {
    this._defaultConfig = {
      ...this._defaultConfig,
      ...config,
    };
    if (this._componentRef) {
      this._componentRef.setInput('defaultConfig', this._defaultConfig);
    }
  }

  /**
   * Opens up an hot-toast without any pre-configurations
   *
   * @param message The message to show in the hot-toast.
   * @param [options] Additional configuration options for the hot-toast.
   * @returns
   * @memberof HotToastService
   */
  show<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown> {
    const toast = this.createToast<DataType>(message || this._defaultConfig.blank.content, 'blank', {
      ...this._defaultConfig,
      ...options,
    });

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
  error<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown> {
    const toast = this.createToast<DataType>(message || this._defaultConfig.error.content, 'error', {
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
  success<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown> {
    const toast = this.createToast<DataType>(message || this._defaultConfig.success.content, 'success', {
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
  loading<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown> {
    const toast = this.createToast<DataType>(message || this._defaultConfig.loading.content, 'loading', {
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
  warning<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown> {
    const toast = this.createToast<DataType>(message || this._defaultConfig.warning.content, 'warning', {
      ...this._defaultConfig,
      ...this._defaultConfig?.warning,
      ...options,
    });

    return toast;
  }

  /**
   * Opens up an hot-toast with pre-configurations for info state
   *
   * @param message The message to show in the hot-toast.
   * @param [options] Additional configuration options for the hot-toast.
   * @returns
   * @memberof HotToastService
   * @since 3.3.0
   */
  info<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown> {
    const toast = this.createToast<DataType>(message || this._defaultConfig.info.content, 'info', {
      ...this._defaultConfig,
      ...this._defaultConfig?.info,
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
  observe<T, DataType>(messages: ObservableMessages<T, DataType>): (source: Observable<T>) => Observable<T> {
    return (source) => {
      let toastRef: CreateHotToastRef<DataType | unknown>;
      let start = 0;

      const loadingContent = messages.loading ?? this._defaultConfig.loading?.content;
      const successContent = messages.success ?? this._defaultConfig.success?.content;
      const errorContent = messages.error ?? this._defaultConfig.error?.content;

      return defer(() => {
        if (loadingContent) {
          toastRef = this.createLoadingToast<T, DataType>(loadingContent);
          start = Date.now();
        }
        return source.pipe(
          tap({
            ...(successContent && {
              next: (val) => {
                toastRef = this.createOrUpdateToast<T, DataType | unknown>(
                  messages,
                  val,
                  toastRef,
                  'success',
                  start === 0 ? start : Date.now() - start
                );
              },
            }),
            ...(errorContent && {
              error: (e) => {
                toastRef = this.createOrUpdateToast<T, DataType | unknown>(
                  messages,
                  e,
                  toastRef,
                  'error',
                  start === 0 ? start : Date.now() - start
                );
              },
            }),
          })
        );
      });
    };
  }

  /**
   * Closes the hot-toast
   *
   * @param [id] - ID of the toast
   * @since 3.0.1 - If ID is not provided, all toasts will be closed
   */
  close(id?: string) {
    if (this._componentRef) {
      this._componentRef.ref.instance.closeToast(id);
    }
  }

  /**
   * Used for internal purpose only.
   * Creates a container component and attaches it to document.body.
   */
  private init() {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this._componentRef = this._viewService
      .createComponent(HotToastContainerComponent)
      .setInput('defaultConfig', this._defaultConfig)
      .appendTo(document.body);
  }

  private createOrUpdateToast<T, DataType>(
    messages: ObservableMessages<T, DataType>,
    val: unknown,
    toastRef: CreateHotToastRef<DataType>,
    type: ToastType,
    diff: number
  ) {
    let content: Content | ValueOrFunction<Content, T> = null;
    let options: ToastOptions<DataType | unknown> = {};
    ({ content, options } = this.getContentAndOptions<any, DataType>(
      type,
      messages[type] || (this._defaultConfig[type] ? this._defaultConfig[type].content : '')
    ));
    content = resolveValueOrFunction(content, val);
    if (toastRef) {
      toastRef.updateMessage(content);
      const updatedOptions: UpdateToastOptions<DataType> = {
        type,
        duration: diff + HOT_TOAST_DEFAULT_TIMEOUTS[type],
        ...options,
        ...(options.duration && { duration: diff + options.duration }),
      };
      toastRef.updateToast(updatedOptions);
    } else {
      this.createToast<DataType, T>(content, type, options);
    }
    return toastRef;
  }

  private createToast<DataType, T = unknown>(
    message: Content,
    type: ToastType,
    options?: DefaultToastOptions,
    observableMessages?: ObservableMessages<T, DataType>
  ): CreateHotToastRef<DataType | unknown> {
    if (!this._isInitialized) {
      this._isInitialized = true;
      this.init();
    }

    const now = Date.now();
    const id = options?.id ?? now.toString();

    if (
      !this.isDuplicate(id) &&
      (!options.persist?.enabled || (options.persist?.enabled && this.handleStorageValue(id, options)))
    ) {
      const toast: Toast<DataType | unknown> = {
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

      return new HotToastRef<DataType | unknown>(toast).appendTo(this._componentRef.ref.instance);
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

  private getContentAndOptions<T, DataType>(
    toastType: ToastType,
    message: Content | ValueOrFunction<Content, T> | ObservableLoading<DataType> | ObservableSuccessOrError<T, DataType>
  ): { options: ToastOptions<DataType | unknown>; content: Content | ValueOrFunction<Content, T> } {
    let content: Content | ValueOrFunction<Content, T>;
    let options: ToastOptions<DataType | unknown> = {
      ...this._defaultConfig,
      ...this._defaultConfig[toastType],
    };

    // typeof message === 'object' won't work, cz TemplateRef's type is object
    if (typeof message === 'string' || isTemplateRef(message) || isComponent(message)) {
      content = message;
    } else {
      let restOptions: ToastOptions<DataType>;
      ({ content, ...restOptions } = message as ObservableLoading<DataType> | ObservableSuccessOrError<T, DataType>);
      options = { ...options, ...restOptions };
    }

    return { content, options };
  }

  private createLoadingToast<T, DataType>(messages: Content | ObservableLoading<DataType>) {
    let content: Content | ValueOrFunction<Content, T> = null;
    let options: ToastOptions<DataType | unknown> = {};

    ({ content, options } = this.getContentAndOptions<any, DataType>('loading', messages));

    return this.loading(content as Content, options);
  }
}
