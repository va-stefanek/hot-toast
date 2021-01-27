import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class LoaderComponent {
}
LoaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'hot-toast-loader',
                template: "<div\n  class=\"hot-toast-loader-icon\"\n  [ngStyle]=\"{ 'border-color': theme?.primary || '#e0e0e0', 'border-right-color': theme?.secondary || '#616161' }\"\n></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@keyframes hotToastRotate{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.hot-toast-loader-icon{animation:hotToastRotate 1s linear infinite;border:2px solid #e0e0e0;border-radius:100%;border-right-color:#616161;box-sizing:border-box;height:20px;width:20px}@media (prefers-reduced-motion:reduce){.hot-toast-loader-icon{animation-duration:5s}}"]
            },] }
];
LoaderComponent.propDecorators = {
    theme: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ25lYXQvaG90LXRvYXN0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2luZGljYXRvci9pY29ucy9sb2FkZXIvbG9hZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVMxRSxNQUFNLE9BQU8sZUFBZTs7O1lBTjNCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixvTEFBc0M7Z0JBRXRDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O29CQUVFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSWNvblRoZW1lIH0gZnJvbSAnLi4vLi4vLi4vLi4vaG90LXRvYXN0Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaG90LXRvYXN0LWxvYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2FkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9sb2FkZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIExvYWRlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHRoZW1lOiBJY29uVGhlbWU7XG59XG4iXX0=