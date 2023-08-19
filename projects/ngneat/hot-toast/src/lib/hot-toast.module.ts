import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicViewModule } from '@ngneat/overview';

import { AnimatedIconComponent } from './components/animated-icon/animated-icon.component';
import { HotToastComponent } from './components/hot-toast/hot-toast.component';
import { CheckMarkComponent } from './components/indicator/icons/checkmark/checkmark.component';
import { ErrorComponent } from './components/indicator/icons/error/error.component';
import { LoaderComponent } from './components/indicator/icons/loader/loader.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { ToastConfig } from './hot-toast.model';
import { HotToastContainerComponent } from './components/hot-toast-container/hot-toast-container.component';
import { WarningComponent } from './components/indicator/icons/warning/warning.component';
import { InfoComponent } from './components/indicator/icons/info/info.component';
import { HotToastService } from './hot-toast.service';

@NgModule({
  declarations: [
    HotToastContainerComponent,
    HotToastComponent,
    AnimatedIconComponent,
    IndicatorComponent,
    CheckMarkComponent,
    ErrorComponent,
    LoaderComponent,
    WarningComponent,
    InfoComponent,
  ],
  imports: [CommonModule, DynamicViewModule],
})
export class HotToastModule {
  static forRoot(
    config?: Partial<ToastConfig>
  ): ModuleWithProviders<HotToastModule> {
    return {
      ngModule: HotToastModule,
      providers: [{ provide: ToastConfig, useValue: config }, HotToastService],
    };
  }

  static forFeature(
    config?: Partial<ToastConfig>
  ): ModuleWithProviders<HotToastModule> {
    return HotToastModule.forRoot(config);
  }
}
