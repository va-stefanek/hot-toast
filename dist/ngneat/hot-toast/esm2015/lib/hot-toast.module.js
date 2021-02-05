import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicContentModule } from '@ngneat/overview';
import { AnimatedIconComponent } from './components/animated-icon/animated-icon.component';
import { HotToastComponent } from './components/hot-toast/hot-toast.component';
import { CheckMarkComponent } from './components/indicator/icons/checkmark/checkmark.component';
import { ErrorComponent } from './components/indicator/icons/error/error.component';
import { LoaderComponent } from './components/indicator/icons/loader/loader.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { ToastConfig } from './hot-toast.model';
import { HotToastContainerComponent } from './components/hot-toast-container/hot-toast-container.component';
import { HotToastService } from './hot-toast.service';
import { WarningComponent } from './components/indicator/icons/warning/warning.component';
export class HotToastModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90LXRvYXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ25lYXQvaG90LXRvYXN0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9ob3QtdG9hc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUNoRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDcEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM1RyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFnQjFGLE1BQU0sT0FBTyxjQUFjO0lBQ3pCLFlBQVksT0FBd0I7UUFDbEMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQTZCO1FBQzFDLE9BQU87WUFDTCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQ3hELENBQUM7SUFDSixDQUFDOzs7WUF4QkYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWiwwQkFBMEI7b0JBQzFCLGlCQUFpQjtvQkFDakIscUJBQXFCO29CQUNyQixrQkFBa0I7b0JBQ2xCLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxlQUFlO29CQUNmLGdCQUFnQjtpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG9CQUFvQixDQUFDO2dCQUM3QyxlQUFlLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQzthQUM5Qzs7O1lBaEJRLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IER5bmFtaWNDb250ZW50TW9kdWxlIH0gZnJvbSAnQG5nbmVhdC9vdmVydmlldyc7XG5cbmltcG9ydCB7IEFuaW1hdGVkSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hbmltYXRlZC1pY29uL2FuaW1hdGVkLWljb24uY29tcG9uZW50JztcbmltcG9ydCB7IEhvdFRvYXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hvdC10b2FzdC9ob3QtdG9hc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENoZWNrTWFya0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9pbmRpY2F0b3IvaWNvbnMvY2hlY2ttYXJrL2NoZWNrbWFyay5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXJyb3JDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaW5kaWNhdG9yL2ljb25zL2Vycm9yL2Vycm9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaW5kaWNhdG9yL2ljb25zL2xvYWRlci9sb2FkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEluZGljYXRvckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9pbmRpY2F0b3IvaW5kaWNhdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2FzdENvbmZpZyB9IGZyb20gJy4vaG90LXRvYXN0Lm1vZGVsJztcbmltcG9ydCB7IEhvdFRvYXN0Q29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hvdC10b2FzdC1jb250YWluZXIvaG90LXRvYXN0LWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSG90VG9hc3RTZXJ2aWNlIH0gZnJvbSAnLi9ob3QtdG9hc3Quc2VydmljZSc7XG5pbXBvcnQgeyBXYXJuaW5nQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2luZGljYXRvci9pY29ucy93YXJuaW5nL3dhcm5pbmcuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgSG90VG9hc3RDb250YWluZXJDb21wb25lbnQsXG4gICAgSG90VG9hc3RDb21wb25lbnQsXG4gICAgQW5pbWF0ZWRJY29uQ29tcG9uZW50LFxuICAgIEluZGljYXRvckNvbXBvbmVudCxcbiAgICBDaGVja01hcmtDb21wb25lbnQsXG4gICAgRXJyb3JDb21wb25lbnQsXG4gICAgTG9hZGVyQ29tcG9uZW50LFxuICAgIFdhcm5pbmdDb21wb25lbnQsXG4gIF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIER5bmFtaWNDb250ZW50TW9kdWxlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbSG90VG9hc3RDb250YWluZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBIb3RUb2FzdE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHNlcnZpY2U6IEhvdFRvYXN0U2VydmljZSkge1xuICAgIHNlcnZpY2UuaW5pdCgpO1xuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogUGFydGlhbDxUb2FzdENvbmZpZz4pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEhvdFRvYXN0TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBIb3RUb2FzdE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogVG9hc3RDb25maWcsIHVzZVZhbHVlOiBjb25maWcgfV0sXG4gICAgfTtcbiAgfVxufVxuIl19