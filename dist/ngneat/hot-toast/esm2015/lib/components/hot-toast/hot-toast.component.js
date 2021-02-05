import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { ENTER_ANIMATION_DURATION, EXIT_ANIMATION_DURATION } from '../../constants';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90LXRvYXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ25lYXQvaG90LXRvYXN0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2hvdC10b2FzdC9ob3QtdG9hc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVwRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBUXRDLE1BQU0sT0FBTyxpQkFBaUI7SUFOOUI7UUFRVyxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBSVYsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDcEMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFJMUQsa0JBQWEsR0FBRyxLQUFLLENBQUM7SUFrRnhCLENBQUM7SUFoRkMsZUFBZTtRQUNiLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU3QyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFrQixFQUFFLEVBQUU7WUFDdEUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzFCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxhQUFhLENBQUMsZ0JBQWdC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QUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFTyxlQUFlLENBQUMsRUFBa0I7UUFDeEMsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzVELENBQUM7OztZQW5HRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLDAvQ0FBdUM7Z0JBRXZDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O29CQUVFLEtBQUs7cUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBRUwsTUFBTTsyQkFDTixNQUFNOzBCQUNOLE1BQU07MkJBRU4sU0FBUyxTQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRU5URVJfQU5JTUFUSU9OX0RVUkFUSU9OLCBFWElUX0FOSU1BVElPTl9EVVJBVElPTiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDcmVhdGVIb3RUb2FzdFJlZiwgSG90VG9hc3RDbG9zZSwgVG9hc3QsIFRvYXN0Q29uZmlnIH0gZnJvbSAnLi4vLi4vaG90LXRvYXN0Lm1vZGVsJztcbmltcG9ydCB7IGFuaW1hdGUgfSBmcm9tICcuLi8uLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hvdC10b2FzdCcsXG4gIHRlbXBsYXRlVXJsOiAnaG90LXRvYXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaG90LXRvYXN0LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBIb3RUb2FzdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHRvYXN0OiBUb2FzdDtcbiAgQElucHV0KCkgb2Zmc2V0ID0gMDtcbiAgQElucHV0KCkgZGVmYXVsdENvbmZpZzogVG9hc3RDb25maWc7XG4gIEBJbnB1dCgpIHRvYXN0UmVmOiBDcmVhdGVIb3RUb2FzdFJlZjtcblxuICBAT3V0cHV0KCkgaGVpZ2h0ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSBiZWZvcmVDbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhZnRlckNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SG90VG9hc3RDbG9zZT4oKTtcblxuICBAVmlld0NoaWxkKCdob3RUb2FzdEJhckJhc2UnKSBwcml2YXRlIHRvYXN0QmFyQmFzZTogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgaXNNYW51YWxDbG9zZSA9IGZhbHNlO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy50b2FzdEJhckJhc2UubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmhlaWdodC5lbWl0KG5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcblxuICAgIG5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uc3RhcnQnLCAoZXY6IEFuaW1hdGlvbkV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5pc0V4aXRBbmltYXRpb24oZXYpKSB7XG4gICAgICAgIHRoaXMuYmVmb3JlQ2xvc2VkLmVtaXQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBuYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIChldjogQW5pbWF0aW9uRXZlbnQpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzRXhpdEFuaW1hdGlvbihldikpIHtcbiAgICAgICAgdGhpcy5hZnRlckNsb3NlZC5lbWl0KHsgZGlzbWlzc2VkQnlBY3Rpb246IHRoaXMuaXNNYW51YWxDbG9zZSwgaWQ6IHRoaXMudG9hc3QuaWQgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXQgY29udGFpbmVyUG9zaXRpb25TdHlsZSgpIHtcbiAgICBjb25zdCB0b3AgPSB0aGlzLnRvYXN0LnBvc2l0aW9uLmluY2x1ZGVzKCd0b3AnKTtcbiAgICBjb25zdCB2ZXJ0aWNhbFN0eWxlID0gdG9wID8geyB0b3A6IDAgfSA6IHsgYm90dG9tOiAwIH07XG5cbiAgICBjb25zdCBob3Jpem9udGFsU3R5bGUgPSB0aGlzLnRvYXN0LnBvc2l0aW9uLmluY2x1ZGVzKCdsZWZ0JylcbiAgICAgID8ge1xuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIH1cbiAgICAgIDogdGhpcy50b2FzdC5wb3NpdGlvbi5pbmNsdWRlcygncmlnaHQnKVxuICAgICAgPyB7XG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7dGhpcy5vZmZzZXQgKiAodG9wID8gMSA6IC0xKX1weClgLFxuICAgICAgLi4udmVydGljYWxTdHlsZSxcbiAgICAgIC4uLmhvcml6b250YWxTdHlsZSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0IHRvYXN0QmFyQmFzZVN0eWxlcygpIHtcbiAgICBjb25zdCB0b3AgPSB0aGlzLnRvYXN0LnBvc2l0aW9uLmluY2x1ZGVzKCd0b3AnKTtcblxuICAgIGNvbnN0IGVudGVyQW5pbWF0aW9uID0gYGhvdFRvYXN0RW50ZXJBbmltYXRpb24ke1xuICAgICAgdG9wID8gJ05lZ2F0aXZlJyA6ICdQb3NpdGl2ZSdcbiAgICB9ICR7RU5URVJfQU5JTUFUSU9OX0RVUkFUSU9OfW1zIGN1YmljLWJlemllcigwLjIxLCAxLjAyLCAwLjczLCAxKSBmb3J3YXJkc2A7XG5cbiAgICBjb25zdCBleGl0QW5pbWF0aW9uID0gYGhvdFRvYXN0RXhpdEFuaW1hdGlvbiR7XG4gICAgICB0b3AgPyAnTmVnYXRpdmUnIDogJ1Bvc2l0aXZlJ1xuICAgIH0gJHtFWElUX0FOSU1BVElPTl9EVVJBVElPTn1tcyBmb3J3YXJkcyBjdWJpYy1iZXppZXIoMC4wNiwgMC43MSwgMC41NSwgMSkgJHt0aGlzLnRvYXN0LmR1cmF0aW9ufW1zYDtcblxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMudG9hc3QuYXV0b0Nsb3NlID8gYCR7ZW50ZXJBbmltYXRpb259LCAke2V4aXRBbmltYXRpb259YCA6IGVudGVyQW5pbWF0aW9uO1xuXG4gICAgcmV0dXJuIHsgLi4udGhpcy50b2FzdC5zdHlsZSwgYW5pbWF0aW9uIH07XG4gIH1cblxuICBnZXQgaXNJY29uU3RyaW5nKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy50b2FzdC5pY29uID09PSAnc3RyaW5nJztcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuaXNNYW51YWxDbG9zZSA9IHRydWU7XG4gICAgY29uc3QgdG9wID0gdGhpcy50b2FzdC5wb3NpdGlvbi5pbmNsdWRlcygndG9wJyk7XG5cbiAgICBjb25zdCBleGl0QW5pbWF0aW9uID0gYGhvdFRvYXN0RXhpdEFuaW1hdGlvbiR7XG4gICAgICB0b3AgPyAnTmVnYXRpdmUnIDogJ1Bvc2l0aXZlJ1xuICAgIH0gJHtFWElUX0FOSU1BVElPTl9EVVJBVElPTn1tcyBmb3J3YXJkcyBjdWJpYy1iZXppZXIoMC4wNiwgMC43MSwgMC41NSwgMSlgO1xuXG4gICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMudG9hc3RCYXJCYXNlLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBhbmltYXRlKG5hdGl2ZUVsZW1lbnQsIGV4aXRBbmltYXRpb24pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0V4aXRBbmltYXRpb24oZXY6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgcmV0dXJuIGV2LmFuaW1hdGlvbk5hbWUuaW5jbHVkZXMoJ2hvdFRvYXN0RXhpdEFuaW1hdGlvbicpO1xuICB9XG59XG4iXX0=