import { Injectable, Optional } from '@angular/core';
import { ViewService } from '@ngneat/overview';
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
    show(message, options) {
        const toast = this.createToast(message, 'blank', Object.assign(Object.assign({}, this._defaultConfig), options));
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
        const toast = this.createToast(message, 'error', Object.assign(Object.assign(Object.assign({}, this._defaultConfig), (_a = this._defaultConfig) === null || _a === void 0 ? void 0 : _a.error), options));
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
        const toast = this.createToast(message, 'success', Object.assign(Object.assign(Object.assign({}, this._defaultConfig), (_a = this._defaultConfig) === null || _a === void 0 ? void 0 : _a.success), options));
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
        const toast = this.createToast(message, 'loading', Object.assign(Object.assign(Object.assign({}, this._defaultConfig), (_a = this._defaultConfig) === null || _a === void 0 ? void 0 : _a.loading), options));
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
        const toast = this.createToast(message, 'warning', Object.assign(Object.assign(Object.assign({}, this._defaultConfig), (_a = this._defaultConfig) === null || _a === void 0 ? void 0 : _a.warning), options));
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
    observe(messages, options) {
        return (source) => {
            var _a;
            let toastRef;
            if (messages.loading) {
                toastRef = this.createToast(messages.loading, 'loading', Object.assign(Object.assign(Object.assign(Object.assign({}, this._defaultConfig), (_a = this._defaultConfig) === null || _a === void 0 ? void 0 : _a.loading), options), options === null || options === void 0 ? void 0 : options.loading));
            }
            return source.pipe(tap({
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
            }));
        };
    }
    /**
     * Closes the hot-toast
     *
     * @param id - ID of the toast
     */
    close(id) {
        this.componentInstance.closeToast(id);
    }
    createOrUpdateToast(messages, val, toastRef, options, type) {
        var _a, _b, _c;
        const message = resolveValueOrFunction(messages[type === 'success' ? 'next' : 'error'], val);
        if (toastRef) {
            toastRef.updateMessage(message);
            const updatedOptions = Object.assign(Object.assign(Object.assign(Object.assign({}, toastRef.getToast()), { type, duration: HOT_TOAST_DEFAULT_TIMEOUTS[type] }), ((_a = this._defaultConfig[type]) !== null && _a !== void 0 ? _a : undefined)), ((_b = toastRef.getToast()[type]) !== null && _b !== void 0 ? _b : {}));
            toastRef.updateToast(updatedOptions);
        }
        else {
            const newOptions = Object.assign(Object.assign(Object.assign(Object.assign({}, this._defaultConfig), ((_c = this._defaultConfig[type]) !== null && _c !== void 0 ? _c : undefined)), options), (options && options[type] ? options[type] : undefined));
            this.createToast(message, type, newOptions);
        }
        return toastRef;
    }
    createToast(message, type, options, observable, observableMessages) {
        var _a, _b, _c, _d;
        const now = Date.now();
        const id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : now.toString();
        if (!this.isDuplicate(id) && this.createStorage(id, options)) {
            const toast = Object.assign({ ariaLive: (_b = options === null || options === void 0 ? void 0 : options.ariaLive) !== null && _b !== void 0 ? _b : 'polite', createdAt: now, duration: (_c = options === null || options === void 0 ? void 0 : options.duration) !== null && _c !== void 0 ? _c : HOT_TOAST_DEFAULT_TIMEOUTS[type], id,
                message, role: (_d = options === null || options === void 0 ? void 0 : options.role) !== null && _d !== void 0 ? _d : 'status', type, visible: true, observable: observable !== null && observable !== void 0 ? observable : undefined, observableMessages: observableMessages !== null && observableMessages !== void 0 ? observableMessages : undefined }, options);
            return new HotToastRef(toast).appendTo(this.componentInstance);
        }
    }
    isDuplicate(id) {
        return this.componentInstance.hasToast(id);
    }
    /**
     * Creates an entry in local or session storage with count ${defaultConfig.persist.count}, if not present.
     * If present in storage, reduces the count
     * and returns the count.
     * Count can not be less than 0.
     */
    createStorage(id, options) {
        var _a;
        let count = 1;
        if ((_a = options.persist) === null || _a === void 0 ? void 0 : _a.enabled) {
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
        }
        return count;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90LXRvYXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmduZWF0L2hvdC10b2FzdC9zcmMvIiwic291cmNlcyI6WyJsaWIvaG90LXRvYXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFXLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXhELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM1RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFLTCxzQkFBc0IsRUFFdEIsV0FBVyxFQUVYLGtCQUFrQixHQUduQixNQUFNLG1CQUFtQixDQUFDOzs7O0FBRzNCLE1BQU0sT0FBTyxlQUFlO0lBTTFCLFlBQW9CLFlBQXlCLEVBQWMsTUFBbUI7UUFBMUQsaUJBQVksR0FBWixZQUFZLENBQWE7UUFIckMsbUJBQWMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ25DLDBCQUFxQixHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUd2RCxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxjQUFjLG1DQUNkLElBQUksQ0FBQyxjQUFjLEdBQ25CLE1BQU0sQ0FDVixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSTtRQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZO2FBQ25DLGVBQWUsQ0FBQywwQkFBMEIsQ0FBQzthQUMzQyxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUM7YUFDOUMsUUFBUSxDQUFD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QWxRRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7WUFyQmhCLFdBQVc7WUFjM0IsV0FBVyx1QkFjcUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250ZW50LCBWaWV3U2VydmljZSB9IGZyb20gJ0BuZ25lYXQvb3ZlcnZpZXcnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBIb3RUb2FzdENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ob3QtdG9hc3QtY29udGFpbmVyL2hvdC10b2FzdC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEhPVF9UT0FTVF9ERUZBVUxUX1RJTUVPVVRTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgSG90VG9hc3RSZWYgfSBmcm9tICcuL2hvdC10b2FzdC1yZWYnO1xuaW1wb3J0IHtcbiAgQ3JlYXRlSG90VG9hc3RSZWYsXG4gIERlZmF1bHRUb2FzdE9wdGlvbnMsXG4gIEhvdFRvYXN0U2VydmljZU1ldGhvZHMsXG4gIE9ic2VydmFibGVNZXNzYWdlcyxcbiAgcmVzb2x2ZVZhbHVlT3JGdW5jdGlvbixcbiAgVG9hc3QsXG4gIFRvYXN0Q29uZmlnLFxuICBUb2FzdE9wdGlvbnMsXG4gIFRvYXN0UGVyc2lzdENvbmZpZyxcbiAgVG9hc3RUeXBlLFxuICBVcGRhdGVUb2FzdE9wdGlvbnMsXG59IGZyb20gJy4vaG90LXRvYXN0Lm1vZGVsJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBIb3RUb2FzdFNlcnZpY2UgaW1wbGVtZW50cyBIb3RUb2FzdFNlcnZpY2VNZXRob2RzIHtcbiAgY29tcG9uZW50SW5zdGFuY2U6IEhvdFRvYXN0Q29udGFpbmVyQ29tcG9uZW50O1xuXG4gIHByaXZhdGUgX2RlZmF1bHRDb25maWcgPSBuZXcgVG9hc3RDb25maWcoKTtcbiAgcHJpdmF0ZSBfZGVmYXVsdFBlcnNpc3RDb25maWcgPSBuZXcgVG9hc3RQZXJzaXN0Q29uZmlnKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmlld1NlcnZpY2U6IFZpZXdTZXJ2aWNlLCBAT3B0aW9uYWwoKSBjb25maWc6IFRvYXN0Q29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgdGhpcy5fZGVmYXVsdENvbmZpZyA9IHtcbiAgICAgICAgLi4udGhpcy5fZGVmYXVsdENvbmZpZyxcbiAgICAgICAgLi4uY29uZmlnLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlZCBmb3IgaW50ZXJuYWwgcHVycG9zZSBvbmx5LlxuICAgKiBDcmVhdGVzIGEgY29udGFpbmVyIGNvbXBvbmVudCBhbmQgYXR0YWNoZXMgaXQgdG8gZG9jdW1lbnQuYm9keS5cbiAgICovXG4gIGluaXQoKSB7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5fdmlld1NlcnZpY2VcbiAgICAgIC5jcmVhdGVDb21wb25lbnQoSG90VG9hc3RDb250YWluZXJDb21wb25lbnQpXG4gICAgICAuc2V0SW5wdXQoJ2RlZmF1bHRDb25maWcnLCB0aGlzLl9kZWZhdWx0Q29uZmlnKVxuICAgICAgLmFwcGVuZFRvKHRoaXMuX2RlZmF1bHRDb25maWcud2luZG93UmVmLmRvY3VtZW50LmJvZHkpO1xuXG4gICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5yZWYuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdXAgYW4gaG90LXRvYXN0IHdpdGhvdXQgYW55IHByZS1jb25maWd1cmF0aW9uc1xuICAgKlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBzaG93IGluIHRoZSBob3QtdG9hc3QuXG4gICAqIEBwYXJhbSBbb3B0aW9uc10gQWRkaXRpb25hbCBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBob3QtdG9hc3QuXG4gICAqIEByZXR1cm5zXG4gICAqIEBtZW1iZXJvZiBIb3RUb2FzdFNlcnZpY2VcbiAgICovXG4gIHNob3cobWVzc2FnZTogQ29udGVudCwgb3B0aW9ucz86IFRvYXN0T3B0aW9ucyk6IENyZWF0ZUhvdFRvYXN0UmVmIHtcbiAgICBjb25zdCB0b2FzdCA9IHRoaXMuY3JlYXRlVG9hc3QobWVzc2FnZSwgJ2JsYW5rJywgeyAuLi50aGlzLl9kZWZhdWx0Q29uZmlnLCAuLi5vcHRpb25zIH0pO1xuXG4gICAgcmV0dXJuIHRvYXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHVwIGFuIGhvdC10b2FzdCB3aXRoIHByZS1jb25maWd1cmF0aW9ucyBmb3IgZXJyb3Igc3RhdGVcbiAgICpcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gc2hvdyBpbiB0aGUgaG90LXRvYXN0LlxuICAgKiBAcGFyYW0gW29wdGlvbnNdIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaG90LXRvYXN0LlxuICAgKiBAcmV0dXJuc1xuICAgKiBAbWVtYmVyb2YgSG90VG9hc3RTZXJ2aWNlXG4gICAqL1xuICBlcnJvcihtZXNzYWdlOiBDb250ZW50LCBvcHRpb25zPzogVG9hc3RPcHRpb25zKTogQ3JlYXRlSG90VG9hc3RSZWYge1xuICAgIGNvbnN0IHRvYXN0ID0gdGhpcy5jcmVhdGVUb2FzdChtZXNzYWdlLCAnZXJyb3InLCB7XG4gICAgICAuLi50aGlzLl9kZWZhdWx0Q29uZmlnLFxuICAgICAgLi4udGhpcy5fZGVmYXVsdENvbmZpZz8uZXJyb3IsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvYXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHVwIGFuIGhvdC10b2FzdCB3aXRoIHByZS1jb25maWd1cmF0aW9ucyBmb3Igc3VjY2VzcyBzdGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBzaG93IGluIHRoZSBob3QtdG9hc3QuXG4gICAqIEBwYXJhbSBbb3B0aW9uc10gQWRkaXRpb25hbCBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBob3QtdG9hc3QuXG4gICAqIEByZXR1cm5zXG4gICAqIEBtZW1iZXJvZiBIb3RUb2FzdFNlcnZpY2VcbiAgICovXG4gIHN1Y2Nlc3MobWVzc2FnZTogQ29udGVudCwgb3B0aW9ucz86IFRvYXN0T3B0aW9ucyk6IENyZWF0ZUhvdFRvYXN0UmVmIHtcbiAgICBjb25zdCB0b2FzdCA9IHRoaXMuY3JlYXRlVG9hc3QobWVzc2FnZSwgJ3N1Y2Nlc3MnLCB7XG4gICAgICAuLi50aGlzLl9kZWZhdWx0Q29uZmlnLFxuICAgICAgLi4udGhpcy5fZGVmYXVsdENvbmZpZz8uc3VjY2VzcyxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9hc3Q7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdXAgYW4gaG90LXRvYXN0IHdpdGggcHJlLWNvbmZpZ3VyYXRpb25zIGZvciBsb2FkaW5nIHN0YXRlXG4gICAqXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIHNob3cgaW4gdGhlIGhvdC10b2FzdC5cbiAgICogQHBhcmFtIFtvcHRpb25zXSBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIGhvdC10b2FzdC5cbiAgICogQHJldHVybnNcbiAgICogQG1lbWJlcm9mIEhvdFRvYXN0U2VydmljZVxuICAgKi9cbiAgbG9hZGluZyhtZXNzYWdlOiBDb250ZW50LCBvcHRpb25zPzogVG9hc3RPcHRpb25zKTogQ3JlYXRlSG90VG9hc3RSZWYge1xuICAgIGNvbnN0IHRvYXN0ID0gdGhpcy5jcmVhdGVUb2FzdChtZXNzYWdlLCAnbG9hZGluZycsIHtcbiAgICAgIC4uLnRoaXMuX2RlZmF1bHRDb25maWcsXG4gICAgICAuLi50aGlzLl9kZWZhdWx0Q29uZmlnPy5sb2FkaW5nLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9KTtcblxuICAgIHJldHVybiB0b2FzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB1cCBhbiBob3QtdG9hc3Qgd2l0aCBwcmUtY29uZmlndXJhdGlvbnMgZm9yIHdhcm5pbmcgc3RhdGVcbiAgICpcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gc2hvdyBpbiB0aGUgaG90LXRvYXN0LlxuICAgKiBAcGFyYW0gW29wdGlvbnNdIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaG90LXRvYXN0LlxuICAgKiBAcmV0dXJuc1xuICAgKiBAbWVtYmVyb2YgSG90VG9hc3RTZXJ2aWNlXG4gICAqL1xuICB3YXJuaW5nKG1lc3NhZ2U6IENvbnRlbnQsIG9wdGlvbnM/OiBUb2FzdE9wdGlvbnMpOiBDcmVhdGVIb3RUb2FzdFJlZiB7XG4gICAgY29uc3QgdG9hc3QgPSB0aGlzLmNyZWF0ZVRvYXN0KG1lc3NhZ2UsICd3YXJuaW5nJywge1xuICAgICAgLi4udGhpcy5fZGVmYXVsdENvbmZpZyxcbiAgICAgIC4uLnRoaXMuX2RlZmF1bHRDb25maWc/Lndhcm5pbmcsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvYXN0O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBPcGVucyB1cCBhbiBob3QtdG9hc3Qgd2l0aCBwcmUtY29uZmlndXJhdGlvbnMgZm9yIGxvYWRpbmcgaW5pdGlhbGx5IGFuZCB0aGVuIGNoYW5nZXMgc3RhdGUgYmFzZWQgb24gbWVzc2FnZXNcbiAgICpcbiAgICogQHRlbXBsYXRlIFQgVFxuICAgKiBAcGFyYW0gbWVzc2FnZXMgTWVzc2FnZXMgZm9yIGVhY2ggc3RhdGUgaS5lLiBsb2FkaW5nLCBuZXh0IGFuZCBlcnJvclxuICAgKiBAcGFyYW0gW29wdGlvbnNdIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaG90LXRvYXN0LlxuICAgKiBAcGFyYW0gb2JzZXJ2YWJsZSBPYnNlcnZhYmxlIHRvIHdoaWNoIHN1YnNjcmlwdGlvbiB3aWxsIGhhcHBlbiBhbmQgbWVzc2FnZXMgd2lsbCBiZSBkaXNwbGF5ZWQgYWNjb3JkaW5nIHRvIG1lc3NhZ2VzXG4gICAqIEByZXR1cm5zXG4gICAqIEBtZW1iZXJvZiBIb3RUb2FzdFNlcnZpY2VcbiAgICovXG4gIG9ic2VydmU8VD4obWVzc2FnZXM6IE9ic2VydmFibGVNZXNzYWdlczxUPiwgb3B0aW9ucz86IERlZmF1bHRUb2FzdE9wdGlvbnMpOiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gKHNvdXJjZSkgPT4ge1xuICAgICAgbGV0IHRvYXN0UmVmOiBDcmVhdGVIb3RUb2FzdFJlZjtcbiAgICAgIGlmIChtZXNzYWdlcy5sb2FkaW5nKSB7XG4gICAgICAgIHRvYXN0UmVmID0gdGhpcy5jcmVhdGVUb2FzdChtZXNzYWdlcy5sb2FkaW5nLCAnbG9hZGluZycsIHtcbiAgICAgICAgICAuLi50aGlzLl9kZWZhdWx0Q29uZmlnLFxuICAgICAgICAgIC4uLnRoaXMuX2RlZmF1bHRDb25maWc/LmxvYWRpbmcsXG4gICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAuLi5vcHRpb25zPy5sb2FkaW5nLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNvdXJjZS5waXBlKFxuICAgICAgICB0YXAoe1xuICAgICAgICAgIG5leHQ6ICh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlcy5uZXh0KSB7XG4gICAgICAgICAgICAgIHRvYXN0UmVmID0gdGhpcy5jcmVhdGVPclVwZGF0ZVRvYXN0KG1lc3NhZ2VzLCB2YWwsIHRvYXN0UmVmLCBvcHRpb25zLCAnc3VjY2VzcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3I6IChlKSA9PiB7XG4gICAgICAgICAgICBpZiAobWVzc2FnZXMuZXJyb3IpIHtcbiAgICAgICAgICAgICAgdG9hc3RSZWYgPSB0aGlzLmNyZWF0ZU9yVXBkYXRlVG9hc3QobWVzc2FnZXMsIGUsIHRvYXN0UmVmLCBvcHRpb25zLCAnZXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgaG90LXRvYXN0XG4gICAqXG4gICAqIEBwYXJhbSBpZCAtIElEIG9mIHRoZSB0b2FzdFxuICAgKi9cbiAgY2xvc2UoaWQ6IHN0cmluZykge1xuICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UuY2xvc2VUb2FzdChpZCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU9yVXBkYXRlVG9hc3Q8VD4oXG4gICAgbWVzc2FnZXM6IE9ic2VydmFibGVNZXNzYWdlczxUPixcbiAgICB2YWw6IHVua25vd24sXG4gICAgdG9hc3RSZWY6IENyZWF0ZUhvdFRvYXN0UmVmLFxuICAgIG9wdGlvbnM6IERlZmF1bHRUb2FzdE9wdGlvbnMsXG4gICAgdHlwZTogVG9hc3RUeXBlXG4gICkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSByZXNvbHZlVmFsdWVPckZ1bmN0aW9uKG1lc3NhZ2VzW3R5cGUgPT09ICdzdWNjZXNzJyA/ICduZXh0JyA6ICdlcnJvciddLCB2YWwpO1xuICAgIGlmICh0b2FzdFJlZikge1xuICAgICAgdG9hc3RSZWYudXBkYXRlTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgIGNvbnN0IHVwZGF0ZWRPcHRpb25zOiBVcGRhdGVUb2FzdE9wdGlvbnMgPSB7XG4gICAgICAgIC4uLnRvYXN0UmVmLmdldFRvYXN0KCksXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGR1cmF0aW9uOiBIT1RfVE9BU1RfREVGQVVMVF9USU1FT1VUU1t0eXBlXSxcbiAgICAgICAgLi4uKHRoaXMuX2RlZmF1bHRDb25maWdbdHlwZV0gPz8gdW5kZWZpbmVkKSxcbiAgICAgICAgLi4uKCh0b2FzdFJlZi5nZXRUb2FzdCgpIGFzIERlZmF1bHRUb2FzdE9wdGlvbnMpW3R5cGVdID8/IHt9KSxcbiAgICAgIH07XG4gICAgICB0b2FzdFJlZi51cGRhdGVUb2FzdCh1cGRhdGVkT3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSB7XG4gICAgICAgIC4uLnRoaXMuX2RlZmF1bHRDb25maWcsXG4gICAgICAgIC4uLih0aGlzLl9kZWZhdWx0Q29uZmlnW3R5cGVdID8/IHVuZGVmaW5lZCksXG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIC4uLihvcHRpb25zICYmIG9wdGlvbnNbdHlwZV0gPyBvcHRpb25zW3R5cGVdIDogdW5kZWZpbmVkKSxcbiAgICAgIH07XG4gICAgICB0aGlzLmNyZWF0ZVRvYXN0KG1lc3NhZ2UsIHR5cGUsIG5ld09wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdG9hc3RSZWY7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVRvYXN0PFQ+KFxuICAgIG1lc3NhZ2U6IENvbnRlbnQsXG4gICAgdHlwZTogVG9hc3RUeXBlLFxuICAgIG9wdGlvbnM/OiBEZWZhdWx0VG9hc3RPcHRpb25zLFxuICAgIG9ic2VydmFibGU/OiBPYnNlcnZhYmxlPFQ+LFxuICAgIG9ic2VydmFibGVNZXNzYWdlcz86IE9ic2VydmFibGVNZXNzYWdlczxUPlxuICApOiBDcmVhdGVIb3RUb2FzdFJlZiB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IGlkID0gb3B0aW9ucz8uaWQgPz8gbm93LnRvU3RyaW5nKCk7XG5cbiAgICBpZiAoIXRoaXMuaXNEdXBsaWNhdGUoaWQpICYmIHRoaXMuY3JlYXRlU3RvcmFnZShpZCwgb3B0aW9ucykpIHtcbiAgICAgIGNvbnN0IHRvYXN0OiBUb2FzdCA9IHtcbiAgICAgICAgYXJpYUxpdmU6IG9wdGlvbnM/LmFyaWFMaXZlID8/ICdwb2xpdGUnLFxuICAgICAgICBjcmVhdGVkQXQ6IG5vdyxcbiAgICAgICAgZHVyYXRpb246IG9wdGlvbnM/LmR1cmF0aW9uID8/IEhPVF9UT0FTVF9ERUZBVUxUX1RJTUVPVVRTW3R5cGVdLFxuICAgICAgICBpZCxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgcm9sZTogb3B0aW9ucz8ucm9sZSA/PyAnc3RhdHVzJyxcbiAgICAgICAgdHlwZSxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgb2JzZXJ2YWJsZTogb2JzZXJ2YWJsZSA/PyB1bmRlZmluZWQsXG4gICAgICAgIG9ic2VydmFibGVNZXNzYWdlczogb2JzZXJ2YWJsZU1lc3NhZ2VzID8/IHVuZGVmaW5lZCxcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBuZXcgSG90VG9hc3RSZWYodG9hc3QpLmFwcGVuZFRvKHRoaXMuY29tcG9uZW50SW5zdGFuY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNEdXBsaWNhdGUoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudEluc3RhbmNlLmhhc1RvYXN0KGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGVudHJ5IGluIGxvY2FsIG9yIHNlc3Npb24gc3RvcmFnZSB3aXRoIGNvdW50ICR7ZGVmYXVsdENvbmZpZy5wZXJzaXN0LmNvdW50fSwgaWYgbm90IHByZXNlbnQuXG4gICAqIElmIHByZXNlbnQgaW4gc3RvcmFnZSwgcmVkdWNlcyB0aGUgY291bnRcbiAgICogYW5kIHJldHVybnMgdGhlIGNvdW50LlxuICAgKiBDb3VudCBjYW4gbm90IGJlIGxlc3MgdGhhbiAwLlxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVTdG9yYWdlKGlkOiBzdHJpbmcsIG9wdGlvbnM6IERlZmF1bHRUb2FzdE9wdGlvbnMpOiBudW1iZXIge1xuICAgIGxldCBjb3VudCA9IDE7XG4gICAgaWYgKG9wdGlvbnMucGVyc2lzdD8uZW5hYmxlZCkge1xuICAgICAgY29uc3QgcGVyc2lzdCA9IHsgLi4udGhpcy5fZGVmYXVsdFBlcnNpc3RDb25maWcsIC4uLm9wdGlvbnMucGVyc2lzdCB9O1xuICAgICAgY29uc3Qgc3RvcmFnZTogU3RvcmFnZSA9IHBlcnNpc3Quc3RvcmFnZSA9PT0gJ2xvY2FsJyA/IGxvY2FsU3RvcmFnZSA6IHNlc3Npb25TdG9yYWdlO1xuICAgICAgY29uc3Qga2V5ID0gcGVyc2lzdC5rZXkucmVwbGFjZSgvXFwke2lkfS9nLCBpZCk7XG5cbiAgICAgIGxldCBpdGVtOiBzdHJpbmcgfCBudW1iZXIgPSBzdG9yYWdlLmdldEl0ZW0oa2V5KTtcblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgaXRlbSA9IHBhcnNlSW50KGl0ZW0sIDEwKTtcbiAgICAgICAgaWYgKGl0ZW0gPiAwKSB7XG4gICAgICAgICAgY291bnQgPSBpdGVtIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb3VudCA9IGl0ZW07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50ID0gcGVyc2lzdC5jb3VudDtcbiAgICAgIH1cblxuICAgICAgc3RvcmFnZS5zZXRJdGVtKGtleSwgY291bnQudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG59XG4iXX0=