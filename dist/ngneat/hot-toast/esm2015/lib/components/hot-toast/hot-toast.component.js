import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { animate } from '../../utils';
export class HotToastComponent {
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
    getPositionStyle() {
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
    getToastBarContainerClasses() {
        var _a;
        return ((_a = this.toast.className) !== null && _a !== void 0 ? _a : ' ') + this.toast.theme;
    }
    get toastBarBaseStyles() {
        const top = this.toast.position.includes('top');
        const enterAnimation = `hotToastEnterAnimation${top ? 'Negative' : 'Positive'} 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards`;
        const exitAnimation = `hotToastExitAnimation${top ? 'Negative' : 'Positive'} 0.8s forwards cubic-bezier(0.06, 0.71, 0.55, 1) ${this.toast.duration}ms`;
        const animation = this.toast.autoClose ? `${enterAnimation}, ${exitAnimation}` : enterAnimation;
        return Object.assign(Object.assign({}, this.toast.style), { animation });
    }
    close() {
        this.isManualClose = true;
        const top = this.toast.position.includes('top');
        const exitAnimation = `hotToastExitAnimation${top ? 'Negative' : 'Positive'} 0.8s forwards cubic-bezier(0.06, 0.71, 0.55, 1)`;
        const nativeElement = this.toastBarBase.nativeElement;
        animate(nativeElement, exitAnimation);
    }
    get isIconString() {
        return typeof this.toast.icon === 'string';
    }
    get isMessageString() {
        return typeof this.toast.message === 'string';
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
                template: "<div class=\"hot-toast-bar-base-container\" [ngStyle]=\"getPositionStyle()\" [ngClass]=\"getToastBarContainerClasses()\">\n  <div\n    class=\"hot-toast-bar-base\"\n    #hotToastBarBase\n    [ngStyle]=\"toastBarBaseStyles\"\n    [style.--hot-toast-animation-state]=\"isManualClose ? 'running' : 'paused'\"\n    [attr.aria-live]=\"toast.ariaLive\"\n    [attr.role]=\"toast.role\"\n  >\n    <ng-container *ngIf=\"toast.icon !== undefined; else indicator\">\n      <ng-container *ngIf=\"isIconString; else iconTemplateOrComponent\">\n        <hot-toast-animated-icon [iconTheme]=\"toast.iconTheme\">{{ toast.icon }}</hot-toast-animated-icon>\n      </ng-container>\n      <ng-template #iconTemplateOrComponent>\n        <dynamic-content [content]=\"toast.icon\"></dynamic-content>\n      </ng-template>\n    </ng-container>\n\n    <ng-template #indicator>\n      <hot-toast-indicator [theme]=\"toast.iconTheme\" [type]=\"toast.type\"></hot-toast-indicator>\n    </ng-template>\n\n    <div class=\"hot-toast-message\">\n      <dynamic-content [content]=\"toast.message\" [context]=\"{ $implicit: toastRef }\"></dynamic-content>\n    </div>\n\n    <button\n      *ngIf=\"toast.dismissible\"\n      (click)=\"close()\"\n      type=\"button\"\n      class=\"hot-toast-close-btn\"\n      aria-label=\"Close\"\n      [ngStyle]=\"toast.closeStyle\"\n    ></button>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".hot-toast-bar-base{align-items:center;background:var(--hot-toast-bg,#fff);border-radius:var(--hot-toast-border-radius,4px);box-shadow:var(--hot-toast-shadow,0 3px 10px rgba(0,0,0,.1),0 3px 3px rgba(0,0,0,.05));color:var(--hot-toast-color,#363636);display:flex;line-height:var(--hot-toast-line,1.3);margin:16px;max-width:300px;padding:8px 10px;pointer-events:auto;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;will-change:transform}.hot-toast-bar-base:focus,.hot-toast-bar-base:hover{animation-play-state:var(--hot-toast-animation-state,paused)!important}@media (prefers-reduced-motion:reduce){.hot-toast-bar-base{animation-duration:10ms!important}}.hot-toast-message{color:inherit;display:flex;flex:1;justify-content:center;margin:4px 10px}.hot-toast-bar-base-container{display:flex;pointer-events:none;position:absolute;transition:transform .23s cubic-bezier(.21,1.02,.73,1)}@media (prefers-reduced-motion:reduce){.hot-toast-bar-base-container{transition-duration:10ms!important}}.hot-toast-bar-base-container.snackbar .hot-toast-bar-base{background:var(--hot-toast-snackbar-bg,#323232);box-shadow:var(--hot-toast-snackbar-shadow,0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12));color:var(--hot-toast-snackbar-color,#fff)}.hot-toast-bar-base-container.snackbar .hot-toast-close-btn{filter:invert(1) grayscale(100%) brightness(200%)}@keyframes hotToastEnterAnimationNegative{0%{opacity:.5;transform:translate3d(0,-80px,0) scale(.6)}to{opacity:1;transform:translateZ(0) scale(1)}}@keyframes hotToastEnterAnimationPositive{0%{opacity:.5;transform:translate3d(0,80px,0) scale(.6)}to{opacity:1;transform:translateZ(0) scale(1)}}@keyframes hotToastExitAnimationPositive{0%{opacity:1;transform:translateZ(-1px) scale(1)}to{opacity:0;transform:translate3d(0,130px,-1px) scale(.5)}}@keyframes hotToastExitAnimationNegative{0%{opacity:1;transform:translateZ(-1px) scale(1)}to{opacity:0;transform:translate3d(0,-130px,-1px) scale(.5)}}.hot-toast-enter-animation-negative{animation:hotToastEnterAnimationNegative .35s cubic-bezier(.21,1.02,.73,1) forwards}.hot-toast-enter-animation-positive{animation:hotToastEnterAnimationPositive .35s cubic-bezier(.21,1.02,.73,1) forwards}.hot-toast-exit-animation-positive{animation:hotToastExitAnimationPositive .8s cubic-bezier(.06,.71,.55,1) forwards}.hot-toast-exit-animation-negative{animation:hotToastExitAnimationNegative .8s cubic-bezier(.06,.71,.55,1) forwards}.hot-toast-close-btn{align-self:flex-start;background-color:initial;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e\");background-position:50%;background-repeat:no-repeat;background-size:.75em;border:0;border-radius:.25rem;box-sizing:initial;display:flex;height:.8em;opacity:.5;padding:.7em .25em .25em;width:.8em}.hot-toast-close-btn:focus{outline:none}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90LXRvYXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ25lYXQvaG90LXRvYXN0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2hvdC10b2FzdC9ob3QtdG9hc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBUXRDLE1BQU0sT0FBTyxpQkFBaUI7SUFOOUI7UUFRVyxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBSVYsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDcEMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFJMUQsa0JBQWEsR0FBRyxLQUFLLENBQUM7SUEwRnhCLENBQUM7SUF4RkMsZUFBZTtRQUNiLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU3QyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFrQixFQUFFLEVBQUU7WUFDdEUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzFCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxhQUFhLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBa0IsRUFBRSxFQUFFO1lBQ3BFLElBQUksSUFBSSxDQUFD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UUFBUSxDQUFDO0lBQzdDLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQztJQUNoRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFTyxlQUFlLENBQUMsRUFBa0I7UUFDeEMsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzVELENBQUM7OztZQTNHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLDAyQ0FBdUM7Z0JBRXZDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O29CQUVFLEtBQUs7cUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBRUwsTUFBTTsyQkFDTixNQUFNOzBCQUNOLE1BQU07MkJBRU4sU0FBUyxTQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3JlYXRlSG90VG9hc3RSZWYsIEhvdFRvYXN0Q2xvc2UsIFRvYXN0LCBUb2FzdENvbmZpZyB9IGZyb20gJy4uLy4uL2hvdC10b2FzdC5tb2RlbCc7XG5pbXBvcnQgeyBhbmltYXRlIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdob3QtdG9hc3QnLFxuICB0ZW1wbGF0ZVVybDogJ2hvdC10b2FzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2hvdC10b2FzdC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgSG90VG9hc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB0b2FzdDogVG9hc3Q7XG4gIEBJbnB1dCgpIG9mZnNldCA9IDA7XG4gIEBJbnB1dCgpIGRlZmF1bHRDb25maWc6IFRvYXN0Q29uZmlnO1xuICBASW5wdXQoKSB0b2FzdFJlZjogQ3JlYXRlSG90VG9hc3RSZWY7XG5cbiAgQE91dHB1dCgpIGhlaWdodCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgYmVmb3JlQ2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWZ0ZXJDbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEhvdFRvYXN0Q2xvc2U+KCk7XG5cbiAgQFZpZXdDaGlsZCgnaG90VG9hc3RCYXJCYXNlJykgcHJpdmF0ZSB0b2FzdEJhckJhc2U6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIGlzTWFudWFsQ2xvc2UgPSBmYWxzZTtcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMudG9hc3RCYXJCYXNlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5oZWlnaHQuZW1pdChuYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCk7XG5cbiAgICBuYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbnN0YXJ0JywgKGV2OiBBbmltYXRpb25FdmVudCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNFeGl0QW5pbWF0aW9uKGV2KSkge1xuICAgICAgICB0aGlzLmJlZm9yZUNsb3NlZC5lbWl0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCAoZXY6IEFuaW1hdGlvbkV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5pc0V4aXRBbmltYXRpb24oZXYpKSB7XG4gICAgICAgIHRoaXMuYWZ0ZXJDbG9zZWQuZW1pdCh7IGRpc21pc3NlZEJ5QWN0aW9uOiB0aGlzLmlzTWFudWFsQ2xvc2UsIGlkOiB0aGlzLnRvYXN0LmlkIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UG9zaXRpb25TdHlsZSgpIHtcbiAgICBjb25zdCB0b3AgPSB0aGlzLnRvYXN0LnBvc2l0aW9uLmluY2x1ZGVzKCd0b3AnKTtcbiAgICBjb25zdCB2ZXJ0aWNhbFN0eWxlID0gdG9wID8geyB0b3A6IDAgfSA6IHsgYm90dG9tOiAwIH07XG5cbiAgICBjb25zdCBob3Jpem9udGFsU3R5bGUgPSB0aGlzLnRvYXN0LnBvc2l0aW9uLmluY2x1ZGVzKCdsZWZ0JylcbiAgICAgID8ge1xuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIH1cbiAgICAgIDogdGhpcy50b2FzdC5wb3NpdGlvbi5pbmNsdWRlcygncmlnaHQnKVxuICAgICAgPyB7XG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7dGhpcy5vZmZzZXQgKiAodG9wID8gMSA6IC0xKX1weClgLFxuICAgICAgLi4udmVydGljYWxTdHlsZSxcbiAgICAgIC4uLmhvcml6b250YWxTdHlsZSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0VG9hc3RCYXJDb250YWluZXJDbGFzc2VzKCkge1xuICAgIHJldHVybiAodGhpcy50b2FzdC5jbGFzc05hbWUgPz8gJyAnKSArIHRoaXMudG9hc3QudGhlbWU7XG4gIH1cblxuICBnZXQgdG9hc3RCYXJCYXNlU3R5bGVzKCkge1xuICAgIGNvbnN0IHRvcCA9IHRoaXMudG9hc3QucG9zaXRpb24uaW5jbHVkZXMoJ3RvcCcpO1xuXG4gICAgY29uc3QgZW50ZXJBbmltYXRpb24gPSBgaG90VG9hc3RFbnRlckFuaW1hdGlvbiR7XG4gICAgICB0b3AgPyAnTmVnYXRpdmUnIDogJ1Bvc2l0aXZlJ1xuICAgIH0gMC4zNXMgY3ViaWMtYmV6aWVyKDAuMjEsIDEuMDIsIDAuNzMsIDEpIGZvcndhcmRzYDtcblxuICAgIGNvbnN0IGV4aXRBbmltYXRpb24gPSBgaG90VG9hc3RFeGl0QW5pbWF0aW9uJHtcbiAgICAgIHRvcCA/ICdOZWdhdGl2ZScgOiAnUG9zaXRpdmUnXG4gICAgfSAwLjhzIGZvcndhcmRzIGN1YmljLWJlemllcigwLjA2LCAwLjcxLCAwLjU1LCAxKSAke3RoaXMudG9hc3QuZHVyYXRpb259bXNgO1xuXG4gICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy50b2FzdC5hdXRvQ2xvc2UgPyBgJHtlbnRlckFuaW1hdGlvbn0sICR7ZXhpdEFuaW1hdGlvbn1gIDogZW50ZXJBbmltYXRpb247XG5cbiAgICByZXR1cm4geyAuLi50aGlzLnRvYXN0LnN0eWxlLCBhbmltYXRpb24gfTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuaXNNYW51YWxDbG9zZSA9IHRydWU7XG4gICAgY29uc3QgdG9wID0gdGhpcy50b2FzdC5wb3NpdGlvbi5pbmNsdWRlcygndG9wJyk7XG5cbiAgICBjb25zdCBleGl0QW5pbWF0aW9uID0gYGhvdFRvYXN0RXhpdEFuaW1hdGlvbiR7XG4gICAgICB0b3AgPyAnTmVnYXRpdmUnIDogJ1Bvc2l0aXZlJ1xuICAgIH0gMC44cyBmb3J3YXJkcyBjdWJpYy1iZXppZXIoMC4wNiwgMC43MSwgMC41NSwgMSlgO1xuXG4gICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMudG9hc3RCYXJCYXNlLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBhbmltYXRlKG5hdGl2ZUVsZW1lbnQsIGV4aXRBbmltYXRpb24pO1xuICB9XG5cbiAgZ2V0IGlzSWNvblN0cmluZygpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMudG9hc3QuaWNvbiA9PT0gJ3N0cmluZyc7XG4gIH1cblxuICBnZXQgaXNNZXNzYWdlU3RyaW5nKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy50b2FzdC5tZXNzYWdlID09PSAnc3RyaW5nJztcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNFeGl0QW5pbWF0aW9uKGV2OiBBbmltYXRpb25FdmVudCkge1xuICAgIHJldHVybiBldi5hbmltYXRpb25OYW1lLmluY2x1ZGVzKCdob3RUb2FzdEV4aXRBbmltYXRpb24nKTtcbiAgfVxufVxuIl19