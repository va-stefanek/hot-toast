import { __rest } from "tslib";
import { Injectable, Optional } from '@angular/core';
import { isComponent, isTemplateRef, ViewService } from '@ngneat/overview';
import { tap } from 'rxjs/operators';
import { HotToastContainerComponent } from './components/hot-toast-container/hot-toast-container.component';
import { HOT_TOAST_DEFAULT_TIMEOUTS } from './constants';
import { HotToastRef } from './hot-toast-ref';
import { resolveValueOrFunction, ToastConfig, ToastPersistConfig, } from './hot-toast.model';
import * as i0 from "@angular/core";
import * as i1 from "@ngneat/overview";
import * as i2 from "./hot-toast.model";
export class HotToastService {
    constructor(_viewService, config) {
        this._viewService = _viewService;
        this._defaultConfig = new ToastConfig();
        this._defaultPersistConfig = new ToastPersistConfig();
        if (config) {
            this._defaultConfig = Object.assign(Object.assign({}, this._defaultConfig), config);
        }
    }
    get defaultConfig() {
        return this._defaultConfig;
    }
    set defaultConfig(config) {
        this._defaultConfig = Object.assign(Object.assign({}, this._defaultConfig), config);
        this._componentRef.setInput('defaultConfig', this._defaultConfig);
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
    show(message, options) {
        const toast = this.createToast(message || this._defaultConfig.blank.content, 'blank', Object.assign(Object.assign({}, this._defaultConfig), options));
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
    error(message, options) {
        var _a;
        const toast = this.createToast(message || this._defaultConfig.error.content, 'error', Object.assign(Object.assign(Object.assign({}, this._defaultConfig), (_a = this._defaultConfig) === null || _a === void 0 ? void 0 : _a.error), options));
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
    success(message, options) {
        var _a;
        const toast = this.createToast(message || this._defaultConfig.success.content, 'success', Object.assign(Object.assign(Object.assign({}, this._defaultConfig), (_a = this._defaultConfig) === null || _a === void 0 ? void 0 : _a.success), options));
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
    loading(message, options) {
        var _a;
        const toast = this.createToast(message || this._defaultConfig.loading.content, 'loading', Object.assign(Object.assign(Object.assign({}, this._defaultConfig), (_a = this._defaultConfig) === null || _a === void 0 ? void 0 : _a.loading), options));
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
    warning(message, options) {
        var _a;
        const toast = this.createToast(message || this._defaultConfig.warning.content, 'warning', Object.assign(Object.assign(Object.assign({}, this._defaultConfig), (_a = this._defaultConfig) === null || _a === void 0 ? void 0 : _a.warning), options));
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
    observe(messages) {
        return (source) => {
            var _a, _b;
            let toastRef;
            let start = 0;
            const loadingContent = messages.loading || ((_a = this._defaultConfig.loading) === null || _a === void 0 ? void 0 : _a.content);
            const errorContent = messages.error || ((_b = this._defaultConfig.error) === null || _b === void 0 ? void 0 : _b.content);
            if (loadingContent) {
                toastRef = this.createLoadingToast(loadingContent);
                start = Date.now();
            }
            return source.pipe(tap(Object.assign({ next: (val) => {
                    toastRef = this.createOrUpdateToast(messages, val, toastRef, 'success', start === 0 ? start : Date.now() - start);
                } }, (errorContent && {
                error: (e) => {
                    toastRef = this.createOrUpdateToast(messages, e, toastRef, 'error', start === 0 ? start : Date.now() - start);
                },
            }))));
        };
    }
    /**
     * Closes the hot-toast
     *
     * @param id - ID of the toast
     */
    close(id) {
        this._componentRef.ref.instance.closeToast(id);
    }
    createOrUpdateToast(messages, val, toastRef, type, diff) {
        let content = null;
        let options = {};
        ({ content, options } = this.getContentAndOptions(type, messages[type] || (this._defaultConfig[type] ? this._defaultConfig[type].content : '')));
        content = resolveValueOrFunction(content, val);
        if (toastRef) {
            toastRef.updateMessage(content);
            const updatedOptions = Object.assign(Object.assign({ type, duration: diff + HOT_TOAST_DEFAULT_TIMEOUTS[type] }, options), (options.duration && { duration: diff + options.duration }));
            toastRef.updateToast(updatedOptions);
        }
        else {
            this.createToast(content, type, options);
        }
        return toastRef;
    }
    createToast(message, type, options, observableMessages) {
        var _a, _b, _c, _d, _e, _f;
        const now = Date.now();
        const id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : now.toString();
        if (!this.isDuplicate(id) &&
            (!((_b = options.persist) === null || _b === void 0 ? void 0 : _b.enabled) || (((_c = options.persist) === null || _c === void 0 ? void 0 : _c.enabled) && this.handleStorageValue(id, options)))) {
            const toast = Object.assign({ ariaLive: (_d = options === null || options === void 0 ? void 0 : options.ariaLive) !== null && _d !== void 0 ? _d : 'polite', createdAt: now, duration: (_e = options === null || options === void 0 ? void 0 : options.duration) !== null && _e !== void 0 ? _e : HOT_TOAST_DEFAULT_TIMEOUTS[type], id,
                message, role: (_f = options === null || options === void 0 ? void 0 : options.role) !== null && _f !== void 0 ? _f : 'status', type, visible: true, observableMessages: observableMessages !== null && observableMessages !== void 0 ? observableMessages : undefined }, options);
            return new HotToastRef(toast).appendTo(this._componentRef.ref.instance);
        }
    }
    /**
     * Checks whether any toast with same id is present.
     *
     * @private
     * @param id - Toast ID
     */
    isDuplicate(id) {
        return this._componentRef.ref.instance.hasToast(id);
    }
    /**
     * Creates an entry in local or session storage with count ${defaultConfig.persist.count}, if not present.
     * If present in storage, reduces the count
     * and returns the count.
     * Count can not be less than 0.
     */
    handleStorageValue(id, options) {
        let count = 1;
        const persist = Object.assign(Object.assign({}, this._defaultPersistConfig), options.persist);
        const storage = persist.storage === 'local' ? localStorage : sessionStorage;
        const key = persist.key.replace(/\${id}/g, id);
        let item = storage.getItem(key);
        if (item) {
            item = parseInt(item, 10);
            if (item > 0) {
                count = item - 1;
            }
            else {
                count = item;
            }
        }
        else {
            count = persist.count;
        }
        storage.setItem(key, count.toString());
        return count;
    }
    getContentAndOptions(toastType, message) {
        var _a;
        let content;
        let options = Object.assign(Object.assign({}, this._defaultConfig), this._defaultConfig[toastType]);
        // typeof message === 'object' won't work, cz TemplateRef's type is object
        if (typeof message === 'string' || isTemplateRef(message) || isComponent(message)) {
            content = message;
        }
        else {
            let restOptions;
            (_a = message, { content } = _a, restOptions = __rest(_a, ["content"]));
            options = Object.assign(Object.assign({}, options), restOptions);
        }
        return { content, options };
    }
    createLoadingToast(messages) {
        let content = null;
        let options = {};
        ({ content, options } = this.getContentAndOptions('loading', messages));
        return this.loading(content, options);
    }
}
HotToastService.ɵprov = i0.ɵɵdefineInjectable({ factory: function HotToastService_Factory() { return new HotToastService(i0.ɵɵinject(i1.ViewService), i0.ɵɵinject(i2.ToastConfig, 8)); }, token: HotToastService, providedIn: "root" });
HotToastService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
HotToastService.ctorParameters = () => [
    { type: ViewService },
    { type: ToastConfig, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90LXRvYXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmduZWF0L2hvdC10b2FzdC9zcmMvIiwic291cmNlcyI6WyJsaWIvaG90LXRvYXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBb0IsV0FBVyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU3RixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDNUcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBT0wsc0JBQXNCLEVBRXRCLFdBQVcsRUFFWCxrQkFBa0IsR0FJbkIsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUczQixNQUFNLE9BQU8sZUFBZTtJQWdCMUIsWUFBb0IsWUFBeUIsRUFBYyxNQUFtQjtRQUExRCxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQWJyQyxtQkFBYyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFXbkMsMEJBQXFCLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBR3ZELElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLGNBQWMsbUNBQ2QsSUFBSSxDQUFDLGNBQWMsR0FDbkIsTUFBTSxDQUNWLENBQUM7U0FDSDtJQUNILENBQUM7SUFuQkQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLGFBQWEsQ0FBQyxNQUFtQjtRQUNuQyxJQUFJLENBQUMsY0FBYyxtQ0FDZCxJQUFJLENBQUMsY0FB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RixFQUFFLE9BQU8sT0FBK0UsRUFBMUUsV0FBVyxjQUF6QixXQUEyQixDQUFGLENBQWdFLENBQUM7WUFDM0YsT0FBTyxtQ0FBUSxPQUFPLEdBQUssV0FBVyxDQUFFLENBQUM7U0FDMUM7UUFFRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTyxrQkFBa0IsQ0FBSSxRQUFxQztRQUNqRSxJQUFJLE9BQU8sR0FBMEMsSUFBSSxDQUFDO1FBQzFELElBQUksT0FBTyxHQUFpQixFQUFFLENBQUM7UUFFL0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQU0sU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFN0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7OztZQXhURixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7WUF4QnFCLFdBQVc7WUFnQmhFLFdBQVcsdUJBeUJxQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBSZWYsIENvbnRlbnQsIGlzQ29tcG9uZW50LCBpc1RlbXBsYXRlUmVmLCBWaWV3U2VydmljZSB9IGZyb20gJ0BuZ25lYXQvb3ZlcnZpZXcnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBIb3RUb2FzdENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ob3QtdG9hc3QtY29udGFpbmVyL2hvdC10b2FzdC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEhPVF9UT0FTVF9ERUZBVUxUX1RJTUVPVVRTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgSG90VG9hc3RSZWYgfSBmcm9tICcuL2hvdC10b2FzdC1yZWYnO1xuaW1wb3J0IHtcbiAgQ3JlYXRlSG90VG9hc3RSZWYsXG4gIERlZmF1bHRUb2FzdE9wdGlvbnMsXG4gIEhvdFRvYXN0U2VydmljZU1ldGhvZHMsXG4gIE9ic2VydmFibGVMb2FkaW5nLFxuICBPYnNlcnZhYmxlTWVzc2FnZXMsXG4gIE9ic2VydmFibGVTdWNjZXNzT3JFcnJvcixcbiAgcmVzb2x2ZVZhbHVlT3JGdW5jdGlvbixcbiAgVG9hc3QsXG4gIFRvYXN0Q29uZmlnLFxuICBUb2FzdE9wdGlvbnMsXG4gIFRvYXN0UGVyc2lzdENvbmZpZyxcbiAgVG9hc3RUeXBlLFxuICBVcGRhdGVUb2FzdE9wdGlvbnMsXG4gIFZhbHVlT3JGdW5jdGlvbixcbn0gZnJvbSAnLi9ob3QtdG9hc3QubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEhvdFRvYXN0U2VydmljZSBpbXBsZW1lbnRzIEhvdFRvYXN0U2VydmljZU1ldGhvZHMge1xuICBwcml2YXRlIF9jb21wb25lbnRSZWY6IENvbXBSZWY8SG90VG9hc3RDb250YWluZXJDb21wb25lbnQ+O1xuXG4gIHByaXZhdGUgX2RlZmF1bHRDb25maWcgPSBuZXcgVG9hc3RDb25maWcoKTtcbiAgZ2V0IGRlZmF1bHRDb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRDb25maWc7XG4gIH1cbiAgc2V0IGRlZmF1bHRDb25maWcoY29uZmlnOiBUb2FzdENvbmZpZykge1xuICAgIHRoaXMuX2RlZmF1bHRDb25maWcgPSB7XG4gICAgICAuLi50aGlzLl9kZWZhdWx0Q29uZmlnLFxuICAgICAgLi4uY29uZmlnLFxuICAgIH07XG4gICAgdGhpcy5fY29tcG9uZW50UmVmLnNldElucHV0KCdkZWZhdWx0Q29uZmlnJywgdGhpcy5fZGVmYXVsdENvbmZpZyk7XG4gIH1cbiAgcHJpdmF0ZSBfZGVmYXVsdFBlcnNpc3RDb25maWcgPSBuZXcgVG9hc3RQZXJzaXN0Q29uZmlnKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmlld1NlcnZpY2U6IFZpZXdTZXJ2aWNlLCBAT3B0aW9uYWwoKSBjb25maWc6IFRvYXN0Q29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgdGhpcy5fZGVmYXVsdENvbmZpZyA9IHtcbiAgICAgICAgLi4udGhpcy5fZGVmYXVsdENvbmZpZyxcbiAgICAgICAgLi4uY29uZmlnLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlZCBmb3IgaW50ZXJuYWwgcHVycG9zZSBvbmx5LlxuICAgKiBDcmVhdGVzIGEgY29udGFpbmVyIGNvbXBvbmVudCBhbmQgYXR0YWNoZXMgaXQgdG8gZG9jdW1lbnQuYm9keS5cbiAgICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5fY29tcG9uZW50UmVmID0gdGhpcy5fdmlld1NlcnZpY2VcbiAgICAgIC5jcmVhdGVDb21wb25lbnQoSG90VG9hc3RDb250YWluZXJDb21wb25lbnQpXG4gICAgICAuc2V0SW5wdXQoJ2RlZmF1bHRDb25maWcnLCB0aGlzLl9kZWZhdWx0Q29uZmlnKVxuICAgICAgLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHVwIGFuIGhvdC10b2FzdCB3aXRob3V0IGFueSBwcmUtY29uZmlndXJhdGlvbnNcbiAgICpcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gc2hvdyBpbiB0aGUgaG90LXRvYXN0LlxuICAgKiBAcGFyYW0gW29wdGlvbnNdIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaG90LXRvYXN0LlxuICAgKiBAcmV0dXJuc1xuICAgKiBAbWVtYmVyb2YgSG90VG9hc3RTZXJ2aWNlXG4gICAqL1xuICBzaG93KG1lc3NhZ2U/OiBDb250ZW50LCBvcHRpb25zPzogVG9hc3RPcHRpb25zKTogQ3JlYXRlSG90VG9hc3RSZWYge1xuICAgIGNvbnN0IHRvYXN0ID0gdGhpcy5jcmVhdGVUb2FzdChtZXNzYWdlIHx8IHRoaXMuX2RlZmF1bHRDb25maWcuYmxhbmsuY29udGVudCwgJ2JsYW5rJywge1xuICAgICAgLi4udGhpcy5fZGVmYXVsdENvbmZpZyxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9hc3Q7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdXAgYW4gaG90LXRvYXN0IHdpdGggcHJlLWNvbmZpZ3VyYXRpb25zIGZvciBlcnJvciBzdGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBzaG93IGluIHRoZSBob3QtdG9hc3QuXG4gICAqIEBwYXJhbSBbb3B0aW9uc10gQWRkaXRpb25hbCBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBob3QtdG9hc3QuXG4gICAqIEByZXR1cm5zXG4gICAqIEBtZW1iZXJvZiBIb3RUb2FzdFNlcnZpY2VcbiAgICovXG4gIGVycm9yKG1lc3NhZ2U/OiBDb250ZW50LCBvcHRpb25zPzogVG9hc3RPcHRpb25zKTogQ3JlYXRlSG90VG9hc3RSZWYge1xuICAgIGNvbnN0IHRvYXN0ID0gdGhpcy5jcmVhdGVUb2FzdChtZXNzYWdlIHx8IHRoaXMuX2RlZmF1bHRDb25maWcuZXJyb3IuY29udGVudCwgJ2Vycm9yJywge1xuICAgICAgLi4udGhpcy5fZGVmYXVsdENvbmZpZyxcbiAgICAgIC4uLnRoaXMuX2RlZmF1bHRDb25maWc/LmVycm9yLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9KTtcblxuICAgIHJldHVybiB0b2FzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB1cCBhbiBob3QtdG9hc3Qgd2l0aCBwcmUtY29uZmlndXJhdGlvbnMgZm9yIHN1Y2Nlc3Mgc3RhdGVcbiAgICpcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gc2hvdyBpbiB0aGUgaG90LXRvYXN0LlxuICAgKiBAcGFyYW0gW29wdGlvbnNdIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaG90LXRvYXN0LlxuICAgKiBAcmV0dXJuc1xuICAgKiBAbWVtYmVyb2YgSG90VG9hc3RTZXJ2aWNlXG4gICAqL1xuICBzdWNjZXNzKG1lc3NhZ2U/OiBDb250ZW50LCBvcHRpb25zPzogVG9hc3RPcHRpb25zKTogQ3JlYXRlSG90VG9hc3RSZWYge1xuICAgIGNvbnN0IHRvYXN0ID0gdGhpcy5jcmVhdGVUb2FzdChtZXNzYWdlIHx8IHRoaXMuX2RlZmF1bHRDb25maWcuc3VjY2Vzcy5jb250ZW50LCAnc3VjY2VzcycsIHtcbiAgICAgIC4uLnRoaXMuX2RlZmF1bHRDb25maWcsXG4gICAgICAuLi50aGlzLl9kZWZhdWx0Q29uZmlnPy5zdWNjZXNzLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9KTtcblxuICAgIHJldHVybiB0b2FzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB1cCBhbiBob3QtdG9hc3Qgd2l0aCBwcmUtY29uZmlndXJhdGlvbnMgZm9yIGxvYWRpbmcgc3RhdGVcbiAgICpcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gc2hvdyBpbiB0aGUgaG90LXRvYXN0LlxuICAgKiBAcGFyYW0gW29wdGlvbnNdIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaG90LXRvYXN0LlxuICAgKiBAcmV0dXJuc1xuICAgKiBAbWVtYmVyb2YgSG90VG9hc3RTZXJ2aWNlXG4gICAqL1xuICBsb2FkaW5nKG1lc3NhZ2U/OiBDb250ZW50LCBvcHRpb25zPzogVG9hc3RPcHRpb25zKTogQ3JlYXRlSG90VG9hc3RSZWYge1xuICAgIGNvbnN0IHRvYXN0ID0gdGhpcy5jcmVhdGVUb2FzdChtZXNzYWdlIHx8IHRoaXMuX2RlZmF1bHRDb25maWcubG9hZGluZy5jb250ZW50LCAnbG9hZGluZycsIHtcbiAgICAgIC4uLnRoaXMuX2RlZmF1bHRDb25maWcsXG4gICAgICAuLi50aGlzLl9kZWZhdWx0Q29uZmlnPy5sb2FkaW5nLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9KTtcblxuICAgIHJldHVybiB0b2FzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB1cCBhbiBob3QtdG9hc3Qgd2l0aCBwcmUtY29uZmlndXJhdGlvbnMgZm9yIHdhcm5pbmcgc3RhdGVcbiAgICpcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gc2hvdyBpbiB0aGUgaG90LXRvYXN0LlxuICAgKiBAcGFyYW0gW29wdGlvbnNdIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaG90LXRvYXN0LlxuICAgKiBAcmV0dXJuc1xuICAgKiBAbWVtYmVyb2YgSG90VG9hc3RTZXJ2aWNlXG4gICAqL1xuICB3YXJuaW5nKG1lc3NhZ2U/OiBDb250ZW50LCBvcHRpb25zPzogVG9hc3RPcHRpb25zKTogQ3JlYXRlSG90VG9hc3RSZWYge1xuICAgIGNvbnN0IHRvYXN0ID0gdGhpcy5jcmVhdGVUb2FzdChtZXNzYWdlIHx8IHRoaXMuX2RlZmF1bHRDb25maWcud2FybmluZy5jb250ZW50LCAnd2FybmluZycsIHtcbiAgICAgIC4uLnRoaXMuX2RlZmF1bHRDb25maWcsXG4gICAgICAuLi50aGlzLl9kZWZhdWx0Q29uZmlnPy53YXJuaW5nLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9KTtcblxuICAgIHJldHVybiB0b2FzdDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgT3BlbnMgdXAgYW4gaG90LXRvYXN0IHdpdGggcHJlLWNvbmZpZ3VyYXRpb25zIGZvciBsb2FkaW5nIGluaXRpYWxseSBhbmQgdGhlbiBjaGFuZ2VzIHN0YXRlIGJhc2VkIG9uIG1lc3NhZ2VzXG4gICAqXG4gICAqIEB0ZW1wbGF0ZSBUIFR5cGUgb2Ygb2JzZXJ2YWJsZVxuICAgKiBAcGFyYW0gbWVzc2FnZXMgTWVzc2FnZXMgZm9yIGVhY2ggc3RhdGUgaS5lLiBsb2FkaW5nLCBzdWNjZXNzIGFuZCBlcnJvclxuICAgKiBAcmV0dXJuc1xuICAgKiBAbWVtYmVyb2YgSG90VG9hc3RTZXJ2aWNlXG4gICAqL1xuICBvYnNlcnZlPFQ+KG1lc3NhZ2VzOiBPYnNlcnZhYmxlTWVzc2FnZXM8VD4pOiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gKHNvdXJjZSkgPT4ge1xuICAgICAgbGV0IHRvYXN0UmVmOiBDcmVhdGVIb3RUb2FzdFJlZjtcbiAgICAgIGxldCBzdGFydCA9IDA7XG5cbiAgICAgIGNvbnN0IGxvYWRpbmdDb250ZW50ID0gbWVzc2FnZXMubG9hZGluZyB8fCB0aGlzLl9kZWZhdWx0Q29uZmlnLmxvYWRpbmc/LmNvbnRlbnQ7XG4gICAgICBjb25zdCBlcnJvckNvbnRlbnQgPSBtZXNzYWdlcy5lcnJvciB8fCB0aGlzLl9kZWZhdWx0Q29uZmlnLmVycm9yPy5jb250ZW50O1xuXG4gICAgICBpZiAobG9hZGluZ0NvbnRlbnQpIHtcbiAgICAgICAgdG9hc3RSZWYgPSB0aGlzLmNyZWF0ZUxvYWRpbmdUb2FzdDxUPihsb2FkaW5nQ29udGVudCk7XG4gICAgICAgIHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNvdXJjZS5waXBlKFxuICAgICAgICB0YXAoe1xuICAgICAgICAgIG5leHQ6ICh2YWwpID0+IHtcbiAgICAgICAgICAgIHRvYXN0UmVmID0gdGhpcy5jcmVhdGVPclVwZGF0ZVRvYXN0KFxuICAgICAgICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgICAgICAgdmFsLFxuICAgICAgICAgICAgICB0b2FzdFJlZixcbiAgICAgICAgICAgICAgJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICBzdGFydCA9PT0gMCA/IHN0YXJ0IDogRGF0ZS5ub3coKSAtIHN0YXJ0XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uKGVycm9yQ29udGVudCAmJiB7XG4gICAgICAgICAgICBlcnJvcjogKGUpID0+IHtcbiAgICAgICAgICAgICAgdG9hc3RSZWYgPSB0aGlzLmNyZWF0ZU9yVXBkYXRlVG9hc3QoXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMsXG4gICAgICAgICAgICAgICAgZSxcbiAgICAgICAgICAgICAgICB0b2FzdFJlZixcbiAgICAgICAgICAgICAgICAnZXJyb3InLFxuICAgICAgICAgICAgICAgIHN0YXJ0ID09PSAwID8gc3RhcnQgOiBEYXRlLm5vdygpIC0gc3RhcnRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSksXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBob3QtdG9hc3RcbiAgICpcbiAgICogQHBhcmFtIGlkIC0gSUQgb2YgdGhlIHRvYXN0XG4gICAqL1xuICBjbG9zZShpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY29tcG9uZW50UmVmLnJlZi5pbnN0YW5jZS5jbG9zZVRvYXN0KGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlT3JVcGRhdGVUb2FzdDxUPihcbiAgICBtZXNzYWdlczogT2JzZXJ2YWJsZU1lc3NhZ2VzPFQ+LFxuICAgIHZhbDogdW5rbm93bixcbiAgICB0b2FzdFJlZjogQ3JlYXRlSG90VG9hc3RSZWYsXG4gICAgdHlwZTogVG9hc3RUeXBlLFxuICAgIGRpZmY6IG51bWJlclxuICApIHtcbiAgICBsZXQgY29udGVudDogQ29udGVudCB8IFZhbHVlT3JGdW5jdGlvbjxDb250ZW50LCBUPiA9IG51bGw7XG4gICAgbGV0IG9wdGlvbnM6IFRvYXN0T3B0aW9ucyA9IHt9O1xuICAgICh7IGNvbnRlbnQsIG9wdGlvbnMgfSA9IHRoaXMuZ2V0Q29udGVudEFuZE9wdGlvbnM8YW55PihcbiAgICAgIHR5cGUsXG4gICAgICBtZXNzYWdlc1t0eXBlXSB8fCAodGhpcy5fZGVmYXVsdENvbmZpZ1t0eXBlXSA/IHRoaXMuX2RlZmF1bHRDb25maWdbdHlwZV0uY29udGVudCA6ICcnKVxuICAgICkpO1xuICAgIGNvbnRlbnQgPSByZXNvbHZlVmFsdWVPckZ1bmN0aW9uKGNvbnRlbnQsIHZhbCk7XG4gICAgaWYgKHRvYXN0UmVmKSB7XG4gICAgICB0b2FzdFJlZi51cGRhdGVNZXNzYWdlKGNvbnRlbnQpO1xuICAgICAgY29uc3QgdXBkYXRlZE9wdGlvbnM6IFVwZGF0ZVRvYXN0T3B0aW9ucyA9IHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgZHVyYXRpb246IGRpZmYgKyBIT1RfVE9BU1RfREVGQVVMVF9USU1FT1VUU1t0eXBlXSxcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgLi4uKG9wdGlvbnMuZHVyYXRpb24gJiYgeyBkdXJhdGlvbjogZGlmZiArIG9wdGlvbnMuZHVyYXRpb24gfSksXG4gICAgICB9O1xuICAgICAgdG9hc3RSZWYudXBkYXRlVG9hc3QodXBkYXRlZE9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZVRvYXN0KGNvbnRlbnQsIHR5cGUsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdG9hc3RSZWY7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVRvYXN0PFQ+KFxuICAgIG1lc3NhZ2U6IENvbnRlbnQsXG4gICAgdHlwZTogVG9hc3RUeXBlLFxuICAgIG9wdGlvbnM/OiBEZWZhdWx0VG9hc3RPcHRpb25zLFxuICAgIG9ic2VydmFibGVNZXNzYWdlcz86IE9ic2VydmFibGVNZXNzYWdlczxUPlxuICApOiBDcmVhdGVIb3RUb2FzdFJlZiB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBpZCA9IG9wdGlvbnM/LmlkID8/IG5vdy50b1N0cmluZygpO1xuXG4gICAgaWYgKFxuICAgICAgIXRoaXMuaXNEdXBsaWNhdGUoaWQpICYmXG4gICAgICAoIW9wdGlvbnMucGVyc2lzdD8uZW5hYmxlZCB8fCAob3B0aW9ucy5wZXJzaXN0Py5lbmFibGVkICYmIHRoaXMuaGFuZGxlU3RvcmFnZVZhbHVlKGlkLCBvcHRpb25zKSkpXG4gICAgKSB7XG4gICAgICBjb25zdCB0b2FzdDogVG9hc3QgPSB7XG4gICAgICAgIGFyaWFMaXZlOiBvcHRpb25zPy5hcmlhTGl2ZSA/PyAncG9saXRlJyxcbiAgICAgICAgY3JlYXRlZEF0OiBub3csXG4gICAgICAgIGR1cmF0aW9uOiBvcHRpb25zPy5kdXJhdGlvbiA/PyBIT1RfVE9BU1RfREVGQVVMVF9USU1FT1VUU1t0eXBlXSxcbiAgICAgICAgaWQsXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIHJvbGU6IG9wdGlvbnM/LnJvbGUgPz8gJ3N0YXR1cycsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgIG9ic2VydmFibGVNZXNzYWdlczogb2JzZXJ2YWJsZU1lc3NhZ2VzID8/IHVuZGVmaW5lZCxcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBuZXcgSG90VG9hc3RSZWYodG9hc3QpLmFwcGVuZFRvKHRoaXMuX2NvbXBvbmVudFJlZi5yZWYuaW5zdGFuY2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBhbnkgdG9hc3Qgd2l0aCBzYW1lIGlkIGlzIHByZXNlbnQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSBpZCAtIFRvYXN0IElEXG4gICAqL1xuICBwcml2YXRlIGlzRHVwbGljYXRlKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50UmVmLnJlZi5pbnN0YW5jZS5oYXNUb2FzdChpZCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBlbnRyeSBpbiBsb2NhbCBvciBzZXNzaW9uIHN0b3JhZ2Ugd2l0aCBjb3VudCAke2RlZmF1bHRDb25maWcucGVyc2lzdC5jb3VudH0sIGlmIG5vdCBwcmVzZW50LlxuICAgKiBJZiBwcmVzZW50IGluIHN0b3JhZ2UsIHJlZHVjZXMgdGhlIGNvdW50XG4gICAqIGFuZCByZXR1cm5zIHRoZSBjb3VudC5cbiAgICogQ291bnQgY2FuIG5vdCBiZSBsZXNzIHRoYW4gMC5cbiAgICovXG4gIHByaXZhdGUgaGFuZGxlU3RvcmFnZVZhbHVlKGlkOiBzdHJpbmcsIG9wdGlvbnM6IERlZmF1bHRUb2FzdE9wdGlvbnMpOiBudW1iZXIge1xuICAgIGxldCBjb3VudCA9IDE7XG4gICAgY29uc3QgcGVyc2lzdCA9IHsgLi4udGhpcy5fZGVmYXVsdFBlcnNpc3RDb25maWcsIC4uLm9wdGlvbnMucGVyc2lzdCB9O1xuICAgIGNvbnN0IHN0b3JhZ2U6IFN0b3JhZ2UgPSBwZXJzaXN0LnN0b3JhZ2UgPT09ICdsb2NhbCcgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICBjb25zdCBrZXkgPSBwZXJzaXN0LmtleS5yZXBsYWNlKC9cXCR7aWR9L2csIGlkKTtcblxuICAgIGxldCBpdGVtOiBzdHJpbmcgfCBudW1iZXIgPSBzdG9yYWdlLmdldEl0ZW0oa2V5KTtcblxuICAgIGlmIChpdGVtKSB7XG4gICAgICBpdGVtID0gcGFyc2VJbnQoaXRlbSwgMTApO1xuICAgICAgaWYgKGl0ZW0gPiAwKSB7XG4gICAgICAgIGNvdW50ID0gaXRlbSAtIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudCA9IGl0ZW07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ID0gcGVyc2lzdC5jb3VudDtcbiAgICB9XG5cbiAgICBzdG9yYWdlLnNldEl0ZW0oa2V5LCBjb3VudC50b1N0cmluZygpKTtcblxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29udGVudEFuZE9wdGlvbnM8VD4oXG4gICAgdG9hc3RUeXBlOiBUb2FzdFR5cGUsXG4gICAgbWVzc2FnZTogQ29udGVudCB8IFZhbHVlT3JGdW5jdGlvbjxDb250ZW50LCBUPiB8IE9ic2VydmFibGVMb2FkaW5nIHwgT2JzZXJ2YWJsZVN1Y2Nlc3NPckVycm9yPFQ+XG4gICkge1xuICAgIGxldCBjb250ZW50OiBDb250ZW50IHwgVmFsdWVPckZ1bmN0aW9uPENvbnRlbnQsIFQ+O1xuICAgIGxldCBvcHRpb25zOiBUb2FzdE9wdGlvbnMgPSB7XG4gICAgICAuLi50aGlzLl9kZWZhdWx0Q29uZmlnLFxuICAgICAgLi4udGhpcy5fZGVmYXVsdENvbmZpZ1t0b2FzdFR5cGVdLFxuICAgIH07XG5cbiAgICAvLyB0eXBlb2YgbWVzc2FnZSA9PT0gJ29iamVjdCcgd29uJ3Qgd29yaywgY3ogVGVtcGxhdGVSZWYncyB0eXBlIGlzIG9iamVjdFxuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycgfHwgaXNUZW1wbGF0ZVJlZihtZXNzYWdlKSB8fCBpc0NvbXBvbmVudChtZXNzYWdlKSkge1xuICAgICAgY29udGVudCA9IG1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByZXN0T3B0aW9uczogVG9hc3RPcHRpb25zO1xuICAgICAgKHsgY29udGVudCwgLi4ucmVzdE9wdGlvbnMgfSA9IG1lc3NhZ2UgYXMgT2JzZXJ2YWJsZUxvYWRpbmcgfCBPYnNlcnZhYmxlU3VjY2Vzc09yRXJyb3I8VD4pO1xuICAgICAgb3B0aW9ucyA9IHsgLi4ub3B0aW9ucywgLi4ucmVzdE9wdGlvbnMgfTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBjb250ZW50LCBvcHRpb25zIH07XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUxvYWRpbmdUb2FzdDxUPihtZXNzYWdlczogQ29udGVudCB8IE9ic2VydmFibGVMb2FkaW5nKSB7XG4gICAgbGV0IGNvbnRlbnQ6IENvbnRlbnQgfCBWYWx1ZU9yRnVuY3Rpb248Q29udGVudCwgVD4gPSBudWxsO1xuICAgIGxldCBvcHRpb25zOiBUb2FzdE9wdGlvbnMgPSB7fTtcblxuICAgICh7IGNvbnRlbnQsIG9wdGlvbnMgfSA9IHRoaXMuZ2V0Q29udGVudEFuZE9wdGlvbnM8YW55PignbG9hZGluZycsIG1lc3NhZ2VzKSk7XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkaW5nKGNvbnRlbnQgYXMgQ29udGVudCwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==