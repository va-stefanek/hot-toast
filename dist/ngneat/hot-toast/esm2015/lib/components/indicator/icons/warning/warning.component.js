import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class WarningComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmduZWF0L2hvdC10b2FzdC9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9pbmRpY2F0b3IvaWNvbnMvd2FybmluZy93YXJuaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVMxRSxNQUFNLE9BQU8sZ0JBQWdCOzs7WUFONUIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLG9MQUF1QztnQkFFdkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7b0JBRUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJY29uVGhlbWUgfSBmcm9tICcuLi8uLi8uLi8uLi9ob3QtdG9hc3QubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdob3QtdG9hc3Qtd2FybmluZycsXG4gIHRlbXBsYXRlVXJsOiAnLi93YXJuaW5nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd2FybmluZy5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgV2FybmluZ0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHRoZW1lOiBJY29uVGhlbWU7XG59XG4iXX0=