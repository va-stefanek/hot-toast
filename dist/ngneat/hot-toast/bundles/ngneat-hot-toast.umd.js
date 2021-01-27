(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ngneat/overview'), require('rxjs/operators'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@ngneat/hot-toast', ['exports', '@angular/core', '@ngneat/overview', 'rxjs/operators', 'rxjs', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ngneat = global.ngneat || {}, global.ngneat['hot-toast'] = {}), global.ng.core, global.i1, global.rxjs.operators, global.rxjs, global.ng.common));
}(this, (function (exports, i0, i1, operators, rxjs, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var HOT_TOAST_DEFAULT_TIMEOUTS = {
        blank: 3000,
        error: 4000,
        success: 3000,
        loading: 30000,
        warning: 4000,
    };

    var ToastConfig = /** @class */ (function () {
        function ToastConfig() {
            /**
             * Sets the reverse order for hot-toast stacking
             *
             * @default false
             */
            this.reverseOrder = false;
            /**
             * Sets the window, from which document will be fetched and hot-toasts will be added to there.
             *
             * @default window
             */
            this.windowRef = window;
            this.ariaLive = 'polite';
            this.role = 'status';
            this.position = 'top-center';
            this.autoClose = true;
            this.theme = 'toast';
        }
        return ToastConfig;
    }());
    var isFunction = function (valOrFunction) { return typeof valOrFunction === 'function'; };
    var ɵ0 = isFunction;
    var resolveValueOrFunction = function (valOrFunction, arg) { return isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction; };
    var ToastPersistConfig = /** @class */ (function () {
        function ToastPersistConfig() {
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
        return ToastPersistConfig;
    }());

    var animate = function (element, value) {
        element.style.animation = value;
    };

    var HotToastComponent = /** @class */ (function () {
        function HotToastComponent() {
            this.offset = 0;
            this.height = new i0.EventEmitter();
            this.beforeClosed = new i0.EventEmitter();
            this.afterClosed = new i0.EventEmitter();
            this.isManualClose = false;
        }
        HotToastComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            var nativeElement = this.toastBarBase.nativeElement;
            this.height.emit(nativeElement.offsetHeight);
            nativeElement.addEventListener('animationstart', function (ev) {
                if (_this.isExitAnimation(ev)) {
                    _this.beforeClosed.emit();
                }
            });
            nativeElement.addEventListener('animationend', function (ev) {
                if (_this.isExitAnimation(ev)) {
                    _this.afterClosed.emit({ dismissedByAction: _this.isManualClose, id: _this.toast.id });
                }
            });
        };
        HotToastComponent.prototype.getPositionStyle = function () {
            var top = this.toast.position.includes('top');
            var verticalStyle = top ? { top: 0 } : { bottom: 0 };
            var horizontalStyle = this.toast.position.includes('left')
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
            return Object.assign(Object.assign({ transform: "translateY(" + this.offset * (top ? 1 : -1) + "px)" }, verticalStyle), horizontalStyle);
        };
        HotToastComponent.prototype.getToastBarContainerClasses = function () {
            var _a;
            return ((_a = this.toast.className) !== null && _a !== void 0 ? _a : ' ') + this.toast.theme;
        };
        Object.defineProperty(HotToastComponent.prototype, "toastBarBaseStyles", {
            get: function () {
                var top = this.toast.position.includes('top');
                var enterAnimation = "hotToastEnterAnimation" + (top ? 'Negative' : 'Positive') + " 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards";
                var exitAnimation = "hotToastExitAnimation" + (top ? 'Negative' : 'Positive') + " 0.8s forwards cubic-bezier(0.06, 0.71, 0.55, 1) " + this.toast.duration + "ms";
                var animation = this.toast.autoClose ? enterAnimation + ", " + exitAnimation : enterAnimation;
                return Object.assign(Object.assign({}, this.toast.style), { animation: animation });
            },
            enumerable: false,
            configurable: true
        });
        HotToastComponent.prototype.close = function () {
            this.isManualClose = true;
            var top = this.toast.position.includes('top');
            var exitAnimation = "hotToastExitAnimation" + (top ? 'Negative' : 'Positive') + " 0.8s forwards cubic-bezier(0.06, 0.71, 0.55, 1)";
            var nativeElement = this.toastBarBase.nativeElement;
            animate(nativeElement, exitAnimation);
        };
        Object.defineProperty(HotToastComponent.prototype, "isIconString", {
            get: function () {
                return typeof this.toast.icon === 'string';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(HotToastComponent.prototype, "isMessageString", {
            get: function () {
                return typeof this.toast.message === 'string';
            },
            enumerable: false,
            configurable: true
        });
        HotToastComponent.prototype.ngOnDestroy = function () {
            this.close();
        };
        HotToastComponent.prototype.isExitAnimation = function (ev) {
            return ev.animationName.includes('hotToastExitAnimation');
        };
        return HotToastComponent;
    }());
    HotToastComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'hot-toast',
                    template: "<div class=\"hot-toast-bar-base-container\" [ngStyle]=\"getPositionStyle()\" [ngClass]=\"getToastBarContainerClasses()\">\n  <div\n    class=\"hot-toast-bar-base\"\n    #hotToastBarBase\n    [ngStyle]=\"toastBarBaseStyles\"\n    [style.--hot-toast-animation-state]=\"isManualClose ? 'running' : 'paused'\"\n    [attr.aria-live]=\"toast.ariaLive\"\n    [attr.role]=\"toast.role\"\n  >\n    <ng-container *ngIf=\"toast.icon !== undefined; else indicator\">\n      <ng-container *ngIf=\"isIconString; else iconTemplateOrComponent\">\n        <hot-toast-animated-icon [iconTheme]=\"toast.iconTheme\">{{ toast.icon }}</hot-toast-animated-icon>\n      </ng-container>\n      <ng-template #iconTemplateOrComponent>\n        <dynamic-content [content]=\"toast.icon\"></dynamic-content>\n      </ng-template>\n    </ng-container>\n\n    <ng-template #indicator>\n      <hot-toast-indicator [theme]=\"toast.iconTheme\" [type]=\"toast.type\"></hot-toast-indicator>\n    </ng-template>\n\n    <div class=\"hot-toast-message\">\n      <dynamic-content [content]=\"toast.message\" [context]=\"{ $implicit: toastRef }\"></dynamic-content>\n    </div>\n\n    <button\n      *ngIf=\"toast.dismissible\"\n      (click)=\"close()\"\n      type=\"button\"\n      class=\"hot-toast-close-btn\"\n      aria-label=\"Close\"\n      [ngStyle]=\"toast.closeStyle\"\n    ></button>\n  </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".hot-toast-bar-base{align-items:center;background:var(--hot-toast-bg,#fff);border-radius:var(--hot-toast-border-radius,4px);box-shadow:var(--hot-toast-shadow,0 3px 10px rgba(0,0,0,.1),0 3px 3px rgba(0,0,0,.05));color:var(--hot-toast-color,#363636);display:flex;line-height:var(--hot-toast-line,1.3);margin:16px;max-width:300px;padding:8px 10px;pointer-events:auto;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;will-change:transform}.hot-toast-bar-base:focus,.hot-toast-bar-base:hover{animation-play-state:var(--hot-toast-animation-state,paused)!important}@media (prefers-reduced-motion:reduce){.hot-toast-bar-base{animation-duration:10ms!important}}.hot-toast-message{color:inherit;display:flex;flex:1;justify-content:center;margin:4px 10px}.hot-toast-bar-base-container{display:flex;pointer-events:none;position:absolute;transition:transform .23s cubic-bezier(.21,1.02,.73,1)}@media (prefers-reduced-motion:reduce){.hot-toast-bar-base-container{transition-duration:10ms!important}}.hot-toast-bar-base-container.snackbar .hot-toast-bar-base{background:var(--hot-toast-snackbar-bg,#323232);box-shadow:var(--hot-toast-snackbar-shadow,0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12));color:var(--hot-toast-snackbar-color,#fff)}.hot-toast-bar-base-container.snackbar .hot-toast-close-btn{filter:invert(1) grayscale(100%) brightness(200%)}@keyframes hotToastEnterAnimationNegative{0%{opacity:.5;transform:translate3d(0,-80px,0) scale(.6)}to{opacity:1;transform:translateZ(0) scale(1)}}@keyframes hotToastEnterAnimationPositive{0%{opacity:.5;transform:translate3d(0,80px,0) scale(.6)}to{opacity:1;transform:translateZ(0) scale(1)}}@keyframes hotToastExitAnimationPositive{0%{opacity:1;transform:translateZ(-1px) scale(1)}to{opacity:0;transform:translate3d(0,130px,-1px) scale(.5)}}@keyframes hotToastExitAnimationNegative{0%{opacity:1;transform:translateZ(-1px) scale(1)}to{opacity:0;transform:translate3d(0,-130px,-1px) scale(.5)}}.hot-toast-enter-animation-negative{animation:hotToastEnterAnimationNegative .35s cubic-bezier(.21,1.02,.73,1) forwards}.hot-toast-enter-animation-positive{animation:hotToastEnterAnimationPositive .35s cubic-bezier(.21,1.02,.73,1) forwards}.hot-toast-exit-animation-positive{animation:hotToastExitAnimationPositive .8s cubic-bezier(.06,.71,.55,1) forwards}.hot-toast-exit-animation-negative{animation:hotToastExitAnimationNegative .8s cubic-bezier(.06,.71,.55,1) forwards}.hot-toast-close-btn{align-self:flex-start;background-color:initial;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e\");background-position:50%;background-repeat:no-repeat;background-size:.75em;border:0;border-radius:.25rem;box-sizing:initial;display:flex;height:.8em;opacity:.5;padding:.7em .25em .25em;width:.8em}.hot-toast-close-btn:focus{outline:none}"]
                },] }
    ];
    HotToastComponent.propDecorators = {
        toast: [{ type: i0.Input }],
        offset: [{ type: i0.Input }],
        defaultConfig: [{ type: i0.Input }],
        toastRef: [{ type: i0.Input }],
        height: [{ type: i0.Output }],
        beforeClosed: [{ type: i0.Output }],
        afterClosed: [{ type: i0.Output }],
        toastBarBase: [{ type: i0.ViewChild, args: ['hotToastBarBase',] }]
    };

    var HotToastContainerComponent = /** @class */ (function () {
        function HotToastContainerComponent(cdr) {
            this.cdr = cdr;
            this.toasts = [];
            this.toastRefs = [];
            this._offsetMargin = 8;
            this.subscriptionList = [];
            /** Subject for notifying the user that the toast has been closed. */
            this._onClosed = new rxjs.Subject();
            this.onClosed$ = this._onClosed.asObservable();
        }
        HotToastContainerComponent.prototype.trackById = function (index, toast) {
            return toast.id;
        };
        HotToastContainerComponent.prototype.calculateOffset = function (toastId, position) {
            var _this = this;
            var visibleToasts = this.toasts.filter(function (t) { return t.visible && t.position === position; });
            var index = visibleToasts.findIndex(function (toast) { return toast.id === toastId; });
            var offset = index !== -1
                ? visibleToasts
                    .slice.apply(visibleToasts, __spread((this.defaultConfig.reverseOrder ? [index + 1] : [0, index]))).reduce(function (acc, t) { return acc + (t.height || 0) + _this._offsetMargin; }, 0)
                : 0;
            return offset;
        };
        HotToastContainerComponent.prototype.updateHeight = function (height, toast) {
            toast.height = height;
        };
        HotToastContainerComponent.prototype.addToast = function (ref) {
            var _d;
            var _this = this;
            this.toastRefs.push(ref);
            var toast = ref.getToast();
            var subscription;
            this.toasts.push(ref.getToast());
            this.cdr.detectChanges();
            if (toast.observable) {
                (_d = this.updateSubscription(toast, subscription), toast = _d.toast, subscription = _d.subscription);
                this.subscriptionList.push(subscription);
            }
            return {
                dispose: function () {
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                    _this.closeToast(toast.id);
                },
                updateMessage: function (message) {
                    toast.message = message;
                    _this.cdr.detectChanges();
                },
                updateToast: function (options) {
                    _this.updateToasts(toast, options);
                    _this.cdr.detectChanges();
                },
                afterClosed: this.getAfterClosed(toast),
            };
        };
        HotToastContainerComponent.prototype.closeToast = function (id) {
            var comp = this.hotToastComponentList.find(function (item) { return item.toast.id === id; });
            if (comp) {
                comp.close();
            }
        };
        HotToastContainerComponent.prototype.beforeClosed = function (toast) {
            toast.visible = false;
        };
        HotToastContainerComponent.prototype.afterClosed = function (closeToast) {
            var toastIndex = this.toasts.findIndex(function (t) { return t.id === closeToast.id; });
            if (toastIndex > -1) {
                this._onClosed.next(closeToast);
                this.toasts = this.toasts.filter(function (t) { return t.id !== closeToast.id; });
                this.toastRefs = this.toastRefs.filter(function (t) { return t.getToast().id !== closeToast.id; });
                this.cdr.detectChanges();
            }
        };
        HotToastContainerComponent.prototype.hasToast = function (id) {
            return this.toasts.findIndex(function (t) { return t.id === id; }) > -1;
        };
        HotToastContainerComponent.prototype.ngOnDestroy = function () {
            this.subscriptionList.forEach(function (s) { return s.unsubscribe(); });
        };
        HotToastContainerComponent.prototype.updateSubscription = function (toast, subscription) {
            var _this = this;
            subscription = toast.observable.pipe(operators.takeUntil(this.getAfterClosed(toast))).subscribe(function (v) {
                var _a, _b, _c;
                if ((_a = toast.observableMessages) === null || _a === void 0 ? void 0 : _a.next) {
                    toast.message = resolveValueOrFunction(toast.observableMessages.next, v);
                    toast = Object.assign(toast, Object.assign(Object.assign(Object.assign(Object.assign({}, toast), { type: 'success', duration: HOT_TOAST_DEFAULT_TIMEOUTS.success }), (_b = _this.defaultConfig) === null || _b === void 0 ? void 0 : _b.success), (_c = toast) === null || _c === void 0 ? void 0 : _c.success));
                    _this.updateToasts(toast);
                    _this.cdr.detectChanges();
                }
            }, function (e) {
                var _a, _b, _c;
                if ((_a = toast.observableMessages) === null || _a === void 0 ? void 0 : _a.error) {
                    toast.message = resolveValueOrFunction(toast.observableMessages.error, e);
                    toast = Object.assign(toast, Object.assign(Object.assign(Object.assign(Object.assign({}, toast), { type: 'error', duration: HOT_TOAST_DEFAULT_TIMEOUTS.error }), (_b = _this.defaultConfig) === null || _b === void 0 ? void 0 : _b.error), (_c = toast) === null || _c === void 0 ? void 0 : _c.error));
                    _this.updateToasts(toast);
                    _this.cdr.detectChanges();
                }
            });
            return { toast: toast, subscription: subscription };
        };
        HotToastContainerComponent.prototype.getAfterClosed = function (toast) {
            return this.onClosed$.pipe(operators.filter(function (v) { return v.id === toast.id; }));
        };
        HotToastContainerComponent.prototype.updateToasts = function (toast, options) {
            this.toasts = this.toasts.map(function (t) { return (Object.assign(Object.assign({}, t), (t.id === toast.id && Object.assign(Object.assign({}, toast), options)))); });
        };
        return HotToastContainerComponent;
    }());
    HotToastContainerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'hot-toast-container',
                    template: "<div style=\"position: fixed; z-index: 9999; top: 0; right: 0; bottom: 0; left: 0; pointer-events: none\">\n  <div style=\"position: relative; height: 100%\">\n    <hot-toast\n      *ngFor=\"let toast of toasts; trackBy: trackById; let i = index\"\n      [toast]=\"toast\"\n      [offset]=\"calculateOffset(toast.id, toast.position)\"\n      [toastRef]=\"toastRefs[i]\"\n      (height)=\"updateHeight($event, toast)\"\n      (beforeClosed)=\"beforeClosed(toast)\"\n      (afterClosed)=\"afterClosed($event)\"\n    ></hot-toast>\n  </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                },] }
    ];
    HotToastContainerComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef }
    ]; };
    HotToastContainerComponent.propDecorators = {
        defaultConfig: [{ type: i0.Input }],
        hotToastComponentList: [{ type: i0.ViewChildren, args: [HotToastComponent,] }]
    };

    var HotToastRef = /** @class */ (function () {
        function HotToastRef(toast) {
            this.toast = toast;
            /** Subject for notifying the user that the toast has been closed. */
            this._onClosed = new rxjs.Subject();
        }
        Object.defineProperty(HotToastRef.prototype, "dispose", {
            set: function (value) {
                this._dispose = value;
            },
            enumerable: false,
            configurable: true
        });
        HotToastRef.prototype.getToast = function () {
            return this.toast;
        };
        /**Used for internal purpose
         * Attach ToastRef to container
         */
        HotToastRef.prototype.appendTo = function (container) {
            var _a = container.addToast(this), dispose = _a.dispose, updateMessage = _a.updateMessage, updateToast = _a.updateToast, afterClosed = _a.afterClosed;
            this.dispose = dispose;
            this.updateMessage = updateMessage;
            this.updateToast = updateToast;
            this.afterClosed = rxjs.race(this._onClosed.asObservable(), afterClosed);
            return this;
        };
        /**
         * Closes the toast
         *
         * @param [closeData={ dismissedByAction: false }] -
         * Make sure to pass { dismissedByAction: true } when closing from template
         * @memberof HotToastRef
         */
        HotToastRef.prototype.close = function (closeData) {
            if (closeData === void 0) { closeData = { dismissedByAction: false }; }
            this._dispose();
            this._onClosed.next({ dismissedByAction: closeData.dismissedByAction, id: this.toast.id });
            this._onClosed.complete();
        };
        return HotToastRef;
    }());

    var HotToastService = /** @class */ (function () {
        function HotToastService(_viewService, config) {
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
        HotToastService.prototype.init = function () {
            var componentRef = this._viewService
                .createComponent(HotToastContainerComponent)
                .setInput('defaultConfig', this._defaultConfig)
                .appendTo(this._defaultConfig.windowRef.document.body);
            this.componentInstance = componentRef.ref.instance;
        };
        /**
         * Opens up an hot-toast without any pre-configurations
         *
         * @param message The message to show in the hot-toast.
         * @param [options] Additional configuration options for the hot-toast.
         * @returns
         * @memberof HotToastService
         */
        HotToastService.prototype.show = function (message, options) {
            var toast = this.createToast(message, 'blank', Object.assign(Object.assign({}, this._defaultConfig), options));
            return toast;
        };
        /**
         * Opens up an hot-toast with pre-configurations for error state
         *
         * @param message The message to show in the hot-toast.
         * @param [options] Additional configuration options for the hot-toast.
         * @returns
         * @memberof HotToastService
         */
        HotToastService.prototype.error = function (message, options) {
            var _a;
            var toast = this.createToast(message, 'error', Object.assign(Object.assign(Object.assign({}, this._defaultConfig), (_a = this._defaultConfig) === null || _a === void 0 ? void 0 : _a.error), options));
            return toast;
        };
        /**
         * Opens up an hot-toast with pre-configurations for success state
         *
         * @param message The message to show in the hot-toast.
         * @param [options] Additional configuration options for the hot-toast.
         * @returns
         * @memberof HotToastService
         */
        HotToastService.prototype.success = function (message, options) {
            var _a;
            var toast = this.createToast(message, 'success', Object.assign(Object.assign(Object.assign({}, this._defaultConfig), (_a = this._defaultConfig) === null || _a === void 0 ? void 0 : _a.success), options));
            return toast;
        };
        /**
         * Opens up an hot-toast with pre-configurations for loading state
         *
         * @param message The message to show in the hot-toast.
         * @param [options] Additional configuration options for the hot-toast.
         * @returns
         * @memberof HotToastService
         */
        HotToastService.prototype.loading = function (message, options) {
            var _a;
            var toast = this.createToast(message, 'loading', Object.assign(Object.assign(Object.assign({}, this._defaultConfig), (_a = this._defaultConfig) === null || _a === void 0 ? void 0 : _a.loading), options));
            return toast;
        };
        /**
         * Opens up an hot-toast with pre-configurations for warning state
         *
         * @param message The message to show in the hot-toast.
         * @param [options] Additional configuration options for the hot-toast.
         * @returns
         * @memberof HotToastService
         */
        HotToastService.prototype.warning = function (message, options) {
            var _a;
            var toast = this.createToast(message, 'warning', Object.assign(Object.assign(Object.assign({}, this._defaultConfig), (_a = this._defaultConfig) === null || _a === void 0 ? void 0 : _a.warning), options));
            return toast;
        };
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
        HotToastService.prototype.observe = function (messages, options) {
            var _this = this;
            return function (source) {
                var _a;
                var toastRef;
                if (messages.loading) {
                    toastRef = _this.createToast(messages.loading, 'loading', Object.assign(Object.assign(Object.assign(Object.assign({}, _this._defaultConfig), (_a = _this._defaultConfig) === null || _a === void 0 ? void 0 : _a.loading), options), options === null || options === void 0 ? void 0 : options.loading));
                }
                return source.pipe(operators.tap({
                    next: function (val) {
                        if (messages.next) {
                            toastRef = _this.createOrUpdateToast(messages, val, toastRef, options, 'success');
                        }
                    },
                    error: function (e) {
                        if (messages.error) {
                            toastRef = _this.createOrUpdateToast(messages, e, toastRef, options, 'error');
                        }
                    },
                }));
            };
        };
        /**
         * Closes the hot-toast
         *
         * @param id - ID of the toast
         */
        HotToastService.prototype.close = function (id) {
            this.componentInstance.closeToast(id);
        };
        HotToastService.prototype.createOrUpdateToast = function (messages, val, toastRef, options, type) {
            var _a, _b, _c;
            var message = resolveValueOrFunction(messages[type === 'success' ? 'next' : 'error'], val);
            if (toastRef) {
                toastRef.updateMessage(message);
                var updatedOptions = Object.assign(Object.assign(Object.assign(Object.assign({}, toastRef.getToast()), { type: type, duration: HOT_TOAST_DEFAULT_TIMEOUTS[type] }), ((_a = this._defaultConfig[type]) !== null && _a !== void 0 ? _a : undefined)), ((_b = toastRef.getToast()[type]) !== null && _b !== void 0 ? _b : {}));
                toastRef.updateToast(updatedOptions);
            }
            else {
                var newOptions = Object.assign(Object.assign(Object.assign(Object.assign({}, this._defaultConfig), ((_c = this._defaultConfig[type]) !== null && _c !== void 0 ? _c : undefined)), options), (options && options[type] ? options[type] : undefined));
                this.createToast(message, type, newOptions);
            }
            return toastRef;
        };
        HotToastService.prototype.createToast = function (message, type, options, observable, observableMessages) {
            var _a, _b, _c, _d;
            var now = Date.now();
            var id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : now.toString();
            if (!this.isDuplicate(id) && this.createStorage(id, options)) {
                var toast = Object.assign({ ariaLive: (_b = options === null || options === void 0 ? void 0 : options.ariaLive) !== null && _b !== void 0 ? _b : 'polite', createdAt: now, duration: (_c = options === null || options === void 0 ? void 0 : options.duration) !== null && _c !== void 0 ? _c : HOT_TOAST_DEFAULT_TIMEOUTS[type], id: id,
                    message: message, role: (_d = options === null || options === void 0 ? void 0 : options.role) !== null && _d !== void 0 ? _d : 'status', type: type, visible: true, observable: observable !== null && observable !== void 0 ? observable : undefined, observableMessages: observableMessages !== null && observableMessages !== void 0 ? observableMessages : undefined }, options);
                return new HotToastRef(toast).appendTo(this.componentInstance);
            }
        };
        HotToastService.prototype.isDuplicate = function (id) {
            return this.componentInstance.hasToast(id);
        };
        /**
         * Creates an entry in local or session storage with count ${defaultConfig.persist.count}, if not present.
         * If present in storage, reduces the count
         * and returns the count.
         * Count can not be less than 0.
         */
        HotToastService.prototype.createStorage = function (id, options) {
            var _a;
            var count = 1;
            if ((_a = options.persist) === null || _a === void 0 ? void 0 : _a.enabled) {
                var persist = Object.assign(Object.assign({}, this._defaultPersistConfig), options.persist);
                var storage = persist.storage === 'local' ? localStorage : sessionStorage;
                var key = persist.key.replace(/\${id}/g, id);
                var item = storage.getItem(key);
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
        };
        return HotToastService;
    }());
    HotToastService.ɵprov = i0.ɵɵdefineInjectable({ factory: function HotToastService_Factory() { return new HotToastService(i0.ɵɵinject(i1.ViewService), i0.ɵɵinject(ToastConfig, 8)); }, token: HotToastService, providedIn: "root" });
    HotToastService.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    HotToastService.ctorParameters = function () { return [
        { type: i1.ViewService },
        { type: ToastConfig, decorators: [{ type: i0.Optional }] }
    ]; };

    var AnimatedIconComponent = /** @class */ (function () {
        function AnimatedIconComponent() {
        }
        return AnimatedIconComponent;
    }());
    AnimatedIconComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'hot-toast-animated-icon',
                    template: "<div class=\"hot-toast-animated-icon\" [style.color]=\"iconTheme?.primary\">\n  <ng-content></ng-content>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["@keyframes hotToastEnter{0%{transform:scale(0)}to{transform:scale(1)}}.hot-toast-animated-icon{animation:hotToastEnter .3s ease-in-out forwards;min-width:20px;position:relative;transform:scale(0)}@media (prefers-reduced-motion:reduce){.hot-toast-animated-icon{animation-duration:none;opacity:1;transform:scale(1)}}"]
                },] }
    ];
    AnimatedIconComponent.propDecorators = {
        iconTheme: [{ type: i0.Input }]
    };

    var CheckMarkComponent = /** @class */ (function () {
        function CheckMarkComponent() {
        }
        return CheckMarkComponent;
    }());
    CheckMarkComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'hot-toast-checkmark',
                    template: "<div\n  class=\"hot-toast-checkmark-icon\"\n  [style.--check-primary]=\"theme?.primary || '#61d345'\"\n  [style.--check-secondary]=\"theme?.secondary || '#fff'\"\n></div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["@keyframes hotToastCircleAnimation{0%{opacity:0;transform:scale(0) rotate(45deg)}to{opacity:1;transform:scale(1) rotate(45deg)}}@keyframes hotToastCheckmarkAnimation{0%{height:0;opacity:0;width:0}40%{height:0;opacity:1;width:6px}to{height:10px;opacity:1}}.hot-toast-checkmark-icon{animation:hotToastCircleAnimation .3s cubic-bezier(.175,.885,.32,1.275) forwards;animation-delay:.1s;background:var(--check-primary,\"#61d345\");border-radius:10px;height:20px;opacity:0;position:relative;transform:rotate(45deg);width:20px}@media (prefers-reduced-motion:reduce){.hot-toast-checkmark-icon{animation-duration:0ms}}.hot-toast-checkmark-icon:after{animation:hotToastCheckmarkAnimation .2s ease-out forwards;animation-delay:.2s;border-bottom:2px solid;border-bottom-color:var(--check-secondary,\"#fff\");border-left-color:var(--check-secondary,\"#fff\");border-right:2px solid;border-right-color:var(--check-secondary,\"#fff\");border-top-color:var(--check-secondary,\"#fff\");bottom:6px;box-sizing:border-box;content:\"\";height:10px;left:6px;opacity:0;position:absolute;width:6px}@media (prefers-reduced-motion:reduce){.hot-toast-checkmark-icon:after{animation-duration:0ms}}"]
                },] }
    ];
    CheckMarkComponent.propDecorators = {
        theme: [{ type: i0.Input }]
    };

    var ErrorComponent = /** @class */ (function () {
        function ErrorComponent() {
        }
        return ErrorComponent;
    }());
    ErrorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'hot-toast-error',
                    template: "<div\n  class=\"hot-toast-error-icon\"\n  [style.--error-primary]=\"theme?.primary || '#ff4b4b'\"\n  [style.--error-secondary]=\"theme?.secondary || '#fff'\"\n></div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["@keyframes hotToastErrorCircleAnimation{0%{opacity:0;transform:scale(0) rotate(45deg)}to{opacity:1;transform:scale(1) rotate(45deg)}}@keyframes hotToastFirstLineAnimation{0%{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}@keyframes hotToastSecondLineAnimation{0%{opacity:0;transform:scale(0) rotate(90deg)}to{opacity:1;transform:scale(1) rotate(90deg)}}.hot-toast-error-icon{animation:hotToastErrorCircleAnimation .3s cubic-bezier(.175,.885,.32,1.275) forwards;animation-delay:.1s;background:var(--error-primary,\"#ff4b4b\");border-radius:10px;height:20px;opacity:0;position:relative;transform:rotate(45deg);width:20px}@media (prefers-reduced-motion:reduce){.hot-toast-error-icon{animation-duration:0ms}}.hot-toast-error-icon:after,.hot-toast-error-icon:before{animation:hotToastFirstLineAnimation .15s ease-out forwards;animation-delay:.15s;background:var(--error-secondary,\"#fff\");border-radius:3px;bottom:9px;content:\"\";height:2px;left:4px;opacity:0;position:absolute;width:12px}@media (prefers-reduced-motion:reduce){.hot-toast-error-icon:after,.hot-toast-error-icon:before{animation-duration:0ms}}.hot-toast-error-icon:before{animation:hotToastSecondLineAnimation .15s ease-out forwards;animation-delay:.18s;transform:rotate(90deg)}@media (prefers-reduced-motion:reduce){.hot-toast-error-icon:before{animation-duration:0ms}}"]
                },] }
    ];
    ErrorComponent.propDecorators = {
        theme: [{ type: i0.Input }]
    };

    var LoaderComponent = /** @class */ (function () {
        function LoaderComponent() {
        }
        return LoaderComponent;
    }());
    LoaderComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'hot-toast-loader',
                    template: "<div\n  class=\"hot-toast-loader-icon\"\n  [ngStyle]=\"{ 'border-color': theme?.primary || '#e0e0e0', 'border-right-color': theme?.secondary || '#616161' }\"\n></div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["@keyframes hotToastRotate{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.hot-toast-loader-icon{animation:hotToastRotate 1s linear infinite;border:2px solid #e0e0e0;border-radius:100%;border-right-color:#616161;box-sizing:border-box;height:20px;width:20px}@media (prefers-reduced-motion:reduce){.hot-toast-loader-icon{animation-duration:5s}}"]
                },] }
    ];
    LoaderComponent.propDecorators = {
        theme: [{ type: i0.Input }]
    };

    var IndicatorComponent = /** @class */ (function () {
        function IndicatorComponent() {
        }
        return IndicatorComponent;
    }());
    IndicatorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'hot-toast-indicator',
                    template: "<ng-container *ngIf=\"type !== 'blank'\">\n  <div class=\"hot-toast-indicator-wrapper\">\n    <hot-toast-loader [theme]=\"theme\"></hot-toast-loader>\n    <ng-container *ngIf=\"type !== 'loading'\">\n      <div class=\"hot-toast-status-wrapper\">\n        <div [ngSwitch]=\"type\">\n          <div *ngSwitchCase=\"'error'\">\n            <hot-toast-error [theme]=\"theme\"></hot-toast-error>\n          </div>\n          <div *ngSwitchCase=\"'success'\">\n            <hot-toast-checkmark [theme]=\"theme\"></hot-toast-checkmark>\n          </div>\n          <div *ngSwitchCase=\"'warning'\">\n            <hot-toast-warning [theme]=\"theme\"></hot-toast-warning>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n  </div>\n</ng-container>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".hot-toast-indicator-wrapper{align-items:center;display:flex;justify-content:center;min-height:20px;min-width:20px;position:relative}.hot-toast-status-wrapper{position:absolute}"]
                },] }
    ];
    IndicatorComponent.propDecorators = {
        theme: [{ type: i0.Input }],
        type: [{ type: i0.Input }]
    };

    var WarningComponent = /** @class */ (function () {
        function WarningComponent() {
        }
        return WarningComponent;
    }());
    WarningComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'hot-toast-warning',
                    template: "<div\n  class=\"hot-toast-warning-icon\"\n  [style.--warn-primary]=\"theme?.primary || '#FFAB00'\"\n  [style.--warn-secondary]=\"theme?.secondary || '#fff'\"\n></div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["@keyframes animate-warn-background{0%{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}@keyframes animate-warn-line{0%{height:0;opacity:0}40%{height:4.8px;opacity:1}to{height:8px;opacity:1}}.hot-toast-warning-icon{animation:animate-warn-background .3s cubic-bezier(.175,.885,.32,1.275) forwards;animation-delay:.1s;background-color:var(--warn-primary,#ffab00);border-radius:50%;display:block;height:20px;opacity:0;position:relative;transform:scale(0);width:20px}.hot-toast-warning-icon:after,.hot-toast-warning-icon:before{background-color:var(--warn-secondary,#fff);border-radius:3px;box-sizing:border-box;content:\"\";display:block;left:8.5px;position:absolute;width:2.5px}.hot-toast-warning-icon:after{animation:animate-warn-line .2s ease-out forwards;animation-delay:.2s;height:0;opacity:0;top:4px}.hot-toast-warning-icon:before{bottom:4px;height:2px}"]
                },] }
    ];
    WarningComponent.propDecorators = {
        theme: [{ type: i0.Input }]
    };

    var HotToastModule = /** @class */ (function () {
        function HotToastModule(service) {
            service.init();
        }
        HotToastModule.forRoot = function (config) {
            return {
                ngModule: HotToastModule,
                providers: [{ provide: ToastConfig, useValue: config }],
            };
        };
        return HotToastModule;
    }());
    HotToastModule.decorators = [
        { type: i0.NgModule, args: [{
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
                    imports: [common.CommonModule, i1.DynamicContentModule],
                },] }
    ];
    HotToastModule.ctorParameters = function () { return [
        { type: HotToastService }
    ]; };

    /*
     * Public API Surface of hot-toast
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.HotToastModule = HotToastModule;
    exports.HotToastRef = HotToastRef;
    exports.HotToastService = HotToastService;
    exports.ToastConfig = ToastConfig;
    exports.ToastPersistConfig = ToastPersistConfig;
    exports.resolveValueOrFunction = resolveValueOrFunction;
    exports.ɵ0 = ɵ0;
    exports.ɵa = HotToastContainerComponent;
    exports.ɵb = HotToastComponent;
    exports.ɵc = AnimatedIconComponent;
    exports.ɵd = IndicatorComponent;
    exports.ɵe = CheckMarkComponent;
    exports.ɵf = ErrorComponent;
    exports.ɵg = LoaderComponent;
    exports.ɵh = WarningComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngneat-hot-toast.umd.js.map
