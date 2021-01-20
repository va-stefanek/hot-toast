import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicContentModule } from '@ngneat/overview';

import { AnimatedIconComponent } from './components/animated-icon/animated-icon.component';
import { HotToastBaseComponent } from './components/hot-toast-base/hot-toast-base.component';
import { CheckMarkComponent } from './components/indicator/icons/checkmark/checkmark.component';
import { ErrorComponent } from './components/indicator/icons/error/error.component';
import { LoaderComponent } from './components/indicator/icons/loader/loader.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { ToastConfig } from './hot-toast.model';
import { HotToastComponent } from './hot-toast.component';
import { HotToastService } from './hot-toast.service';

@NgModule({
  declarations: [
    HotToastComponent,
    HotToastBaseComponent,
    AnimatedIconComponent,
    IndicatorComponent,
    CheckMarkComponent,
    ErrorComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, DynamicContentModule],
})
export class HotToastModule {
  static forRoot(config?: Partial<ToastConfig>): ModuleWithProviders<HotToastModule> {
    return {
      ngModule: HotToastModule,
      providers: [{ provide: ToastConfig, useValue: config }],
    };
  }

  constructor(service: HotToastService) {
    service.init();
  }
}
