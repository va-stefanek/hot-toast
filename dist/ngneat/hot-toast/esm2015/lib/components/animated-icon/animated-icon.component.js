import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class AnimatedIconComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0ZWQtaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmduZWF0L2hvdC10b2FzdC9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hbmltYXRlZC1pY29uL2FuaW1hdGVkLWljb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUzFFLE1BQU0sT0FBTyxxQkFBcUI7OztZQU5qQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsK0hBQTZDO2dCQUU3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozt3QkFFRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEljb25UaGVtZSB9IGZyb20gJy4uLy4uL2hvdC10b2FzdC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hvdC10b2FzdC1hbmltYXRlZC1pY29uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FuaW1hdGVkLWljb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hbmltYXRlZC1pY29uLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBbmltYXRlZEljb25Db21wb25lbnQge1xuICBASW5wdXQoKSBpY29uVGhlbWU6IEljb25UaGVtZTtcbn1cbiJdfQ==