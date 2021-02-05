import { __rest } from 'tslib';
import { EventEmitter, Component, ChangeDetectionStrategy, Input, Output, ViewChild, ChangeDetectorRef, ViewChildren, ɵɵdefineInjectable, ɵɵinject, Injectable, Optional, NgModule } from '@angular/core';
import { isTemplateRef, isComponent, ViewService, DynamicContentModule } from '@ngneat/overview';
import { filter, tap } from 'rxjs/operators';
import { Subject, race } from 'rxjs';
import { CommonModule } from '@angular/common';

const HOT_TOAST_DEFAULT_TIMEOUTS = {
    blank: 4000,
    error: 4000,
    success: 4000,
    loading: 30000,
    warning: 4000,
};
const EXIT_ANIMATION_DURATION = 800;
const ENTER_ANIMATION_DURATION = 350;
const HOT_TOAST_MARGIN = 8;

const animate = (element, value) => {
    element.style.animation = value;
};

class HotToastComponent {
    constructor() {
        this.offset = 0;
        this.height = new EventEmitter();
        this.beforeClosed = new EventEmitter();
        this.afterClosed = new EventEmitter();
        this.isManualClose = false;
    }
    ngAfterViewInit() {
        const nativeElement = this.toastBarBase.nativeElement;
        this.height.emit(nativeElement.offsetHeight);
        nativeElement.addEventListener('animationstart', (ev) => {
            if (this.isExitAnimation(ev)) {
                this.beforeClosed.emit();
            }
        });
        nativeElement.addEventListener('animationend', (ev) => {
            if (this.isExitAnimation(ev)) {
                this.afterClosed.emit({ dismissedByAction: this.isManualClose, id: this.toast.id });
            }
        });
    }
    get containerPositionStyle() {
        const top = this.toast.position.includes('top');
        const verticalStyle = top ? { top: 0 } : { bottom: 0 };
        const horizontalStyle = this.toast.position.includes('left')
            ? {
                left: 0,
            }
            : this.toast.position.includes('right')
                ? {
                    right: 0,
                }
                : {
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                };
        return Object.assign(Object.assign({ transform: `translateY(${this.offset * (top ? 1 : -1)}px)` }, verticalStyle), horizontalStyle);
    }
    get toastBarBaseStyles() {
        const top = this.toast.position.includes('top');
        const enterAnimation = `hotToastEnterAnimation${top ? 'Negative' : 'Positive'} ${ENTER_ANIMATION_DURATION}ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards`;
        const exitAnimation = `hotToastExitAnimation${top ? 'Negative' : 'Positive'} ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1) ${this.toast.duration}ms`;
        const animation = this.toast.autoClose ? `${enterAnimation}, ${exitAnimation}` : enterAnimation;
        return Object.assign(Object.assign({}, this.toast.style), { animation });
    }
    get isIconString() {
        return typeof this.toast.icon === 'string';
    }
    close() {
        this.isManualClose = true;
        const top = this.toast.position.includes('top');
        const exitAnimation = `hotToastExitAnimation${top ? 'Negative' : 'Positive'} ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1)`;
        const nativeElement = this.toastBarBase.nativeElement;
        animate(nativeElement, exitAnimation);
    }
    ngOnDestroy() {
        this.close();
    }
    isExitAnimation(ev) {
        return ev.animationName.includes('hotToastExitAnimation');
    }
}
HotToastComponent.decorators = [
    { type: Component, args: [{
                selector: 'hot-toast',
                template: "<div\n  class=\"hot-toast-bar-base-container\"\n  [ngStyle]=\"containerPositionStyle\"\n  [ngClass]=\"'hot-toast-theme-' + toast.theme\"\n>\n  <div\n    class=\"hot-toast-bar-base\"\n    #hotToastBarBase\n    [ngStyle]=\"toastBarBaseStyles\"\n    [ngClass]=\"toast.className\"\n    [style.--hot-toast-animation-state]=\"isManualClose ? 'running' : 'paused'\"\n    [attr.aria-live]=\"toast.ariaLive\"\n    [attr.role]=\"toast.role\"\n  >\n    <div class=\"hot-toast-icon\" aria-hidden=\"true\">\n      <ng-container *ngIf=\"toast.icon !== undefined; else indicator\">\n        <ng-container *ngIf=\"isIconString; else iconTemplateOrComponent\">\n          <hot-toast-animated-icon [iconTheme]=\"toast.iconTheme\">{{ toast.icon }}</hot-toast-animated-icon>\n        </ng-container>\n        <ng-template #iconTemplateOrComponent>\n          <dynamic-content [content]=\"toast.icon\"></dynamic-content>\n        </ng-template>\n      </ng-container>\n\n      <ng-template #indicator>\n        <hot-toast-indicator [theme]=\"toast.iconTheme\" [type]=\"toast.type\"></hot-toast-indicator>\n      </ng-template>\n    </div>\n\n    <div class=\"hot-toast-message\">\n      <dynamic-content [content]=\"toast.message\" [context]=\"{ $implicit: toastRef }\"></dynamic-content>\n    </div>\n\n    <button\n      *ngIf=\"toast.dismissible\"\n      (click)=\"close()\"\n      type=\"button\"\n      class=\"hot-toast-close-btn\"\n      aria-label=\"Close\"\n      [ngStyle]=\"toast.closeStyle\"\n    ></button>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".hot-toast-bar-base{align-items:center;background:var(--hot-toast-bg,#fff);border-radius:var(--hot-toast-border-radius,4px);box-shadow:var(--hot-toast-shadow,0 3px 10px rgba(0,0,0,.1),0 3px 3px rgba(0,0,0,.05));color:var(--hot-toast-color,#363636);display:flex;line-height:var(--hot-toast-line,1.3);margin:16px;max-width:var(--hot-toast-max-width,350px);padding:8px 10px;pointer-events:auto;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;will-change:transform}.hot-toast-bar-base:focus,.hot-toast-bar-base:hover{animation-play-state:var(--hot-toast-animation-state,paused)!important}@media (prefers-reduced-motion:reduce){.hot-toast-bar-base{animation-duration:10ms!important}}.hot-toast-message{color:inherit;display:flex;flex:1;justify-content:center;margin:4px 10px}.hot-toast-bar-base-container{display:flex;pointer-events:none;position:absolute;transition:transform .23s cubic-bezier(.21,1.02,.73,1)}@media (prefers-reduced-motion:reduce){.hot-toast-bar-base-container{transition-duration:10ms!important}}.hot-toast-bar-base-container.hot-toast-theme-snackbar .hot-toast-bar-base{background:var(--hot-toast-snackbar-bg,#323232);box-shadow:var(--hot-toast-snackbar-shadow,0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12));color:var(--hot-toast-snackbar-color,#fff)}.hot-toast-bar-base-container.hot-toast-theme-snackbar .hot-toast-close-btn{filter:invert(1) grayscale(100%) brightness(200%)}@keyframes hotToastEnterAnimationNegative{0%{opacity:.5;transform:translate3d(0,-80px,0) scale(.6)}to{opacity:1;transform:translateZ(0) scale(1)}}@keyframes hotToastEnterAnimationPositive{0%{opacity:.5;transform:translate3d(0,80px,0) scale(.6)}to{opacity:1;transform:translateZ(0) scale(1)}}@keyframes hotToastExitAnimationPositive{0%{opacity:1;transform:translateZ(-1px) scale(1)}to{opacity:0;transform:translate3d(0,130px,-1px) scale(.5)}}@keyframes hotToastExitAnimationNegative{0%{opacity:1;transform:translateZ(-1px) scale(1)}to{opacity:0;transform:translate3d(0,-130px,-1px) scale(.5)}}.hot-toast-close-btn{align-self:flex-start;background-color:initial;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e\");background-position:50%;background-repeat:no-repeat;background-size:.75em;border:0;border-radius:.25rem;box-sizing:initial;display:flex;height:.8em;margin-top:.25em;opacity:.5;padding:.25em;width:.8em}.hot-toast-close-btn:focus{box-shadow:0 0 0 .125rem rgba(13,110,253,.25);outline:none}.hot-toast-close-btn:focus,.hot-toast-close-btn:hover{opacity:.75}.hot-toast-icon{align-self:flex-start;padding-top:.25em}"]
            },] }
];
HotToastComponent.propDecorators = {
    toast: [{ type: Input }],
    offset: [{ type: Input }],
    defaultConfig: [{ type: Input }],
    toastRef: [{ type: Input }],
    height: [{ type: Output }],
    beforeClosed: [{ type: Output }],
    afterClosed: [{ type: Output }],
    toastBarBase: [{ type: ViewChild, args: ['hotToastBarBase',] }]
};

class HotToastContainerComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.toasts = [];
        this.toastRefs = [];
        /** Subject for notifying the user that the toast has been closed. */
        this._onClosed = new Subject();
        this.onClosed$ = this._onClosed.asObservable();
    }
    trackById(index, toast) {
        return toast.id;
    }
    calculateOffset(toastId, position) {
        const visibleToasts = this.toasts.filter((t) => t.visible && t.position === position);
        const index = visibleToasts.findIndex((toast) => toast.id === toastId);
        const offset = index !== -1
            ? visibleToasts
                .slice(...(this.defaultConfig.reverseOrder ? [index + 1] : [0, index]))
                .reduce((acc, t) => acc + (t.height || 0) + HOT_TOAST_MARGIN, 0)
            : 0;
        return offset;
    }
    updateHeight(height, toast) {
        toast.height = height;
        this.cdr.detectChanges();
    }
    addToast(ref) {
        this.toastRefs.push(ref);
        const toast = ref.getToast();
        this.toasts.push(ref.getToast());
        this.cdr.detectChanges();
        return {
            dispose: () => {
                this.closeToast(toast.id);
            },
            updateMessage: (message) => {
                toast.message = message;
                this.cdr.detectChanges();
            },
            updateToast: (options) => {
                this.updateToasts(toast, options);
                this.cdr.detectChanges();
            },
            afterClosed: this.getAfterClosed(toast),
        };
    }
    closeToast(id) {
        const comp = this.hotToastComponentList.find((item) => item.toast.id === id);
        if (comp) {
            comp.close();
        }
    }
    beforeClosed(toast) {
        toast.visible = false;
    }
    afterClosed(closeToast) {
        const toastIndex = this.toasts.findIndex((t) => t.id === closeToast.id);
        if (toastIndex > -1) {
            this._onClosed.next(closeToast);
            this.toasts = this.toasts.filter((t) => t.id !== closeToast.id);
            this.toastRefs = this.toastRefs.filter((t) => t.getToast().id !== closeToast.id);
            this.cdr.detectChanges();
        }
    }
    hasToast(id) {
        return this.toasts.findIndex((t) => t.id === id) > -1;
    }
    getAfterClosed(toast) {
        return this.onClosed$.pipe(filter((v) => v.id === toast.id));
    }
    updateToasts(toast, options) {
        this.toasts = this.toasts.map((t) => (Object.assign(Object.assign({}, t), (t.id === toast.id && Object.assign(Object.assign({}, toast), options)))));
    }
}
HotToastContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'hot-toast-container',
                template: "<div style=\"position: fixed; z-index: 9999; top: 0; right: 0; bottom: 0; left: 0; pointer-events: none\">\n  <div style=\"position: relative; height: 100%\">\n    <hot-toast\n      *ngFor=\"let toast of toasts; trackBy: trackById; let i = index\"\n      [toast]=\"toast\"\n      [offset]=\"calculateOffset(toast.id, toast.position)\"\n      [toastRef]=\"toastRefs[i]\"\n      (height)=\"updateHeight($event, toast)\"\n      (beforeClosed)=\"beforeClosed(toast)\"\n      (afterClosed)=\"afterClosed($event)\"\n    ></hot-toast>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
HotToastContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
HotToastContainerComponent.propDecorators = {
    defaultConfig: [{ type: Input }],
    hotToastComponentList: [{ type: ViewChildren, args: [HotToastComponent,] }]
};

class HotToastRef {
    constructor(toast) {
        this.toast = toast;
        /** Subject for notifying the user that the toast has been closed. */
        this._onClosed = new Subject();
    }
    set dispose(value) {
        this._dispose = value;
    }
    getToast() {
        return this.toast;
    }
    /**Used for internal purpose
     * Attach ToastRef to container
     */
    appendTo(container) {
        const { dispose, updateMessage, updateToast, afterClosed } = container.addToast(this);
        this.dispose = dispose;
        this.updateMessage = updateMessage;
        this.updateToast = updateToast;
        this.afterClosed = race(this._onClosed.asObservable(), afterClosed);
        return this;
    }
    /**
     * Closes the toast
     *
     * @param [closeData={ dismissedByAction: false }] -
     * Make sure to pass { dismissedByAction: true } when closing from template
     * @memberof HotToastRef
     */
    close(closeData = { dismissedByAction: false }) {
        this._dispose();
        this._onClosed.next({ dismissedByAction: closeData.dismissedByAction, id: this.toast.id });
        this._onClosed.complete();
    }
}

class ToastConfig {
    constructor() {
        /**
         * Sets the reverse order for hot-toast stacking
         *
         * @default false
         */
        this.reverseOrder = false;
        this.ariaLive = 'polite';
        this.role = 'status';
        this.position = 'top-center';
        this.autoClose = true;
        this.theme = 'toast';
        // key in ToastType
        this.success = { content: '' };
        this.error = { content: '' };
        this.loading = { content: '' };
        this.blank = { content: '' };
        this.warning = { content: '' };
    }
}
const isFunction = (valOrFunction) => typeof valOrFunction === 'function';
const ɵ0 = isFunction;
const resolveValueOrFunction = (valOrFunction, arg) => isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;
class ToastPersistConfig {
    constructor() {
        /**
         *In which storage id vs. counts should be stored
         *
         * @type {('local' | 'session')}
         * @memberof ToastPersistConfig
         * @default 'local'
         */
        this.storage = 'local';
        /**
         *The key pattern to store object in storage. `${id}` in pattern is replaced with actual toast id.
         *
         * @type {('local' | 'session')}
         * @memberof ToastPersistConfig
         * @default 'ngneat/hottoast-${id}'
         */
        this.key = 'ngneat/hototast-${id}';
        /**
         *The number of toasts allowed to show.
         *
         * @memberof ToastPersistConfig
         * @default 1
         */
        this.count = 1;
        this.enabled = false;
    }
}

class HotToastService {
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
HotToastService.ɵprov = ɵɵdefineInjectable({ factory: function HotToastService_Factory() { return new HotToastService(ɵɵinject(ViewService), ɵɵinject(ToastConfig, 8)); }, token: HotToastService, providedIn: "root" });
HotToastService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
HotToastService.ctorParameters = () => [
    { type: ViewService },
    { type: ToastConfig, decorators: [{ type: Optional }] }
];

class AnimatedIconComponent {
}
AnimatedIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'hot-toast-animated-icon',
                template: "<div class=\"hot-toast-animated-icon\" [style.color]=\"iconTheme?.primary\">\n  <ng-content></ng-content>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@keyframes hotToastEnter{0%{transform:scale(0)}to{transform:scale(1)}}.hot-toast-animated-icon{animation:hotToastEnter .3s ease-in-out forwards;min-width:20px;position:relative;transform:scale(0)}@media (prefers-reduced-motion:reduce){.hot-toast-animated-icon{animation-duration:none;opacity:1;transform:scale(1)}}"]
            },] }
];
AnimatedIconComponent.propDecorators = {
    iconTheme: [{ type: Input }]
};

class CheckMarkComponent {
}
CheckMarkComponent.decorators = [
    { type: Component, args: [{
                selector: 'hot-toast-checkmark',
                template: "<div\n  class=\"hot-toast-checkmark-icon\"\n  [style.--check-primary]=\"theme?.primary || '#61d345'\"\n  [style.--check-secondary]=\"theme?.secondary || '#fff'\"\n></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@keyframes hotToastCircleAnimation{0%{opacity:0;transform:scale(0) rotate(45deg)}to{opacity:1;transform:scale(1) rotate(45deg)}}@keyframes hotToastCheckmarkAnimation{0%{height:0;opacity:0;width:0}40%{height:0;opacity:1;width:6px}to{height:10px;opacity:1}}.hot-toast-checkmark-icon{animation:hotToastCircleAnimation .3s cubic-bezier(.175,.885,.32,1.275) forwards;animation-delay:.1s;background:var(--check-primary,#61d345);border-radius:10px;height:20px;opacity:0;position:relative;transform:rotate(45deg);width:20px}@media (prefers-reduced-motion:reduce){.hot-toast-checkmark-icon{animation-duration:0ms}}.hot-toast-checkmark-icon:after{animation:hotToastCheckmarkAnimation .2s ease-out forwards;animation-delay:.2s;border-bottom:2px solid;border-bottom-color:var(--check-secondary,#fff);border-left-color:var(--check-secondary,#fff);border-right:2px solid;border-right-color:var(--check-secondary,#fff);border-top-color:var(--check-secondary,#fff);bottom:6px;box-sizing:border-box;content:\"\";height:10px;left:6px;opacity:0;position:absolute;width:6px}@media (prefers-reduced-motion:reduce){.hot-toast-checkmark-icon:after{animation-duration:0ms}}"]
            },] }
];
CheckMarkComponent.propDecorators = {
    theme: [{ type: Input }]
};

class ErrorComponent {
}
ErrorComponent.decorators = [
    { type: Component, args: [{
                selector: 'hot-toast-error',
                template: "<div\n  class=\"hot-toast-error-icon\"\n  [style.--error-primary]=\"theme?.primary || '#ff4b4b'\"\n  [style.--error-secondary]=\"theme?.secondary || '#fff'\"\n></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@keyframes hotToastErrorCircleAnimation{0%{opacity:0;transform:scale(0) rotate(45deg)}to{opacity:1;transform:scale(1) rotate(45deg)}}@keyframes hotToastFirstLineAnimation{0%{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}@keyframes hotToastSecondLineAnimation{0%{opacity:0;transform:scale(0) rotate(90deg)}to{opacity:1;transform:scale(1) rotate(90deg)}}.hot-toast-error-icon{animation:hotToastErrorCircleAnimation .3s cubic-bezier(.175,.885,.32,1.275) forwards;animation-delay:.1s;background:var(--error-primary,#ff4b4b);border-radius:10px;height:20px;opacity:0;position:relative;transform:rotate(45deg);width:20px}@media (prefers-reduced-motion:reduce){.hot-toast-error-icon{animation-duration:0ms}}.hot-toast-error-icon:after,.hot-toast-error-icon:before{animation:hotToastFirstLineAnimation .15s ease-out forwards;animation-delay:.15s;background:var(--error-secondary,#fff);border-radius:3px;bottom:9px;content:\"\";height:2px;left:4px;opacity:0;position:absolute;width:12px}@media (prefers-reduced-motion:reduce){.hot-toast-error-icon:after,.hot-toast-error-icon:before{animation-duration:0ms}}.hot-toast-error-icon:before{animation:hotToastSecondLineAnimation .15s ease-out forwards;animation-delay:.18s;transform:rotate(90deg)}@media (prefers-reduced-motion:reduce){.hot-toast-error-icon:before{animation-duration:0ms}}"]
            },] }
];
ErrorComponent.propDecorators = {
    theme: [{ type: Input }]
};

class LoaderComponent {
}
LoaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'hot-toast-loader',
                template: "<div\n  class=\"hot-toast-loader-icon\"\n  [ngStyle]=\"{ 'border-color': theme?.primary || '#e0e0e0', 'border-right-color': theme?.secondary || '#616161' }\"\n></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@keyframes hotToastRotate{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.hot-toast-loader-icon{animation:hotToastRotate 1s linear infinite;border:2px solid #e0e0e0;border-radius:100%;border-right-color:#616161;box-sizing:border-box;height:18px;padding-top:2px;width:18px}@media (prefers-reduced-motion:reduce){.hot-toast-loader-icon{animation-duration:5s}}"]
            },] }
];
LoaderComponent.propDecorators = {
    theme: [{ type: Input }]
};

class IndicatorComponent {
}
IndicatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'hot-toast-indicator',
                template: "<ng-container *ngIf=\"type !== 'blank'\">\n  <div class=\"hot-toast-indicator-wrapper\">\n    <hot-toast-loader [theme]=\"theme\"></hot-toast-loader>\n    <ng-container *ngIf=\"type !== 'loading'\">\n      <div class=\"hot-toast-status-wrapper\">\n        <div [ngSwitch]=\"type\">\n          <div *ngSwitchCase=\"'error'\">\n            <hot-toast-error [theme]=\"theme\"></hot-toast-error>\n          </div>\n          <div *ngSwitchCase=\"'success'\">\n            <hot-toast-checkmark [theme]=\"theme\"></hot-toast-checkmark>\n          </div>\n          <div *ngSwitchCase=\"'warning'\">\n            <hot-toast-warning [theme]=\"theme\"></hot-toast-warning>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n  </div>\n</ng-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".hot-toast-indicator-wrapper{align-items:center;display:flex;justify-content:center;min-height:20px;min-width:20px;position:relative}.hot-toast-status-wrapper{position:absolute}"]
            },] }
];
IndicatorComponent.propDecorators = {
    theme: [{ type: Input }],
    type: [{ type: Input }]
};

class WarningComponent {
}
WarningComponent.decorators = [
    { type: Component, args: [{
                selector: 'hot-toast-warning',
                template: "<div\n  class=\"hot-toast-warning-icon\"\n  [style.--warn-primary]=\"theme?.primary || '#FFAB00'\"\n  [style.--warn-secondary]=\"theme?.secondary || '#fff'\"\n></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@keyframes animate-warn-background{0%{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}@keyframes animate-warn-line{0%{height:0;opacity:0}40%{height:4.8px;opacity:1}to{height:8px;opacity:1}}.hot-toast-warning-icon{animation:animate-warn-background .3s cubic-bezier(.175,.885,.32,1.275) forwards;animation-delay:.1s;background-color:var(--warn-primary,#ffab00);border-radius:50%;display:block;height:20px;opacity:0;position:relative;transform:scale(0);width:20px}.hot-toast-warning-icon:after,.hot-toast-warning-icon:before{background-color:var(--warn-secondary,#fff);border-radius:3px;box-sizing:border-box;content:\"\";display:block;left:8.5px;position:absolute;width:2.5px}.hot-toast-warning-icon:after{animation:animate-warn-line .2s ease-out forwards;animation-delay:.2s;height:0;opacity:0;top:4px}.hot-toast-warning-icon:before{bottom:4px;height:2px}"]
            },] }
];
WarningComponent.propDecorators = {
    theme: [{ type: Input }]
};

class HotToastModule {
    constructor(service) {
        service.init();
    }
    static forRoot(config) {
        return {
            ngModule: HotToastModule,
            providers: [{ provide: ToastConfig, useValue: config }],
        };
    }
}
HotToastModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    HotToastContainerComponent,
                    HotToastComponent,
                    AnimatedIconComponent,
                    IndicatorComponent,
                    CheckMarkComponent,
                    ErrorComponent,
                    LoaderComponent,
                    WarningComponent,
                ],
                imports: [CommonModule, DynamicContentModule],
                entryComponents: [HotToastContainerComponent],
            },] }
];
HotToastModule.ctorParameters = () => [
    { type: HotToastService }
];

/*
 * Public API Surface of hot-toast
 */

/**
 * Generated bundle index. Do not edit.
 */

export { HotToastModule, HotToastService, ToastConfig, ToastPersistConfig, resolveValueOrFunction, ɵ0, HotToastContainerComponent as ɵa, HotToastComponent as ɵb, AnimatedIconComponent as ɵc, IndicatorComponent as ɵd, CheckMarkComponent as ɵe, ErrorComponent as ɵf, LoaderComponent as ɵg, WarningComponent as ɵh };
//# sourceMappingURL=ngneat-hot-toast.js.map
