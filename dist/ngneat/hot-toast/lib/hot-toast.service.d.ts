import { Content, ViewService } from '@ngneat/overview';
import { Observable } from 'rxjs';
import { HotToastContainerComponent } from './components/hot-toast-container/hot-toast-container.component';
import { CreateHotToastRef, DefaultToastOptions, HotToastServiceMethods, ObservableMessages, ToastConfig, ToastOptions } from './hot-toast.model';
export declare class HotToastService implements HotToastServiceMethods {
    private _viewService;
    componentInstance: HotToastContainerComponent;
    private _defaultConfig;
    private _defaultPersistConfig;
    constructor(_viewService: ViewService, config: ToastConfig);
    /**
     * Used for internal purpose only.
     * Creates a container component and attaches it to document.body.
     */
    init(): void;
    /**
     * Opens up an hot-toast without any pre-configurations
     *
     * @param message The message to show in the hot-toast.
     * @param [options] Additional configuration options for the hot-toast.
     * @returns
     * @memberof HotToastService
     */
    show(message: Content, options?: ToastOptions): CreateHotToastRef;
    /**
     * Opens up an hot-toast with pre-configurations for error state
     *
     * @param message The message to show in the hot-toast.
     * @param [options] Additional configuration options for the hot-toast.
     * @returns
     * @memberof HotToastService
     */
    error(message: Content, options?: ToastOptions): CreateHotToastRef;
    /**
     * Opens up an hot-toast with pre-configurations for success state
     *
     * @param message The message to show in the hot-toast.
     * @param [options] Additional configuration options for the hot-toast.
     * @returns
     * @memberof HotToastService
     */
    success(message: Content, options?: ToastOptions): CreateHotToastRef;
    /**
     * Opens up an hot-toast with pre-configurations for loading state
     *
     * @param message The message to show in the hot-toast.
     * @param [options] Additional configuration options for the hot-toast.
     * @returns
     * @memberof HotToastService
     */
    loading(message: Content, options?: ToastOptions): CreateHotToastRef;
    /**
     * Opens up an hot-toast with pre-configurations for warning state
     *
     * @param message The message to show in the hot-toast.
     * @param [options] Additional configuration options for the hot-toast.
     * @returns
     * @memberof HotToastService
     */
    warning(message: Content, options?: ToastOptions): CreateHotToastRef;
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
    observe<T>(messages: ObservableMessages<T>, options?: DefaultToastOptions): (source: Observable<T>) => Observable<T>;
    /**
     * Closes the hot-toast
     *
     * @param id - ID of the toast
     */
    close(id: string): void;
    private createOrUpdateToast;
    private createToast;
    private isDuplicate;
    /**
     * Creates an entry in local or session storage with count ${defaultConfig.persist.count}, if not present.
     * If present in storage, reduces the count
     * and returns the count.
     * Count can not be less than 0.
     */
    private createStorage;
}
