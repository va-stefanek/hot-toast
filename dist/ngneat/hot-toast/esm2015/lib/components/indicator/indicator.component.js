import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class IndicatorComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kaWNhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ25lYXQvaG90LXRvYXN0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2luZGljYXRvci9pbmRpY2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUzFFLE1BQU0sT0FBTyxrQkFBa0I7OztZQU45QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IscXdCQUF1QztnQkFFdkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7b0JBRUUsS0FBSzttQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEljb25UaGVtZSwgVG9hc3RUeXBlIH0gZnJvbSAnLi4vLi4vaG90LXRvYXN0Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaG90LXRvYXN0LWluZGljYXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnaW5kaWNhdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaW5kaWNhdG9yLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBJbmRpY2F0b3JDb21wb25lbnQge1xuICBASW5wdXQoKSB0aGVtZTogSWNvblRoZW1lO1xuICBASW5wdXQoKSB0eXBlOiBUb2FzdFR5cGU7XG59XG4iXX0=