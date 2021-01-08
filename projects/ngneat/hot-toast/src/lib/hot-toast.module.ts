import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';

import { AnimatedIconComponent } from './components/animated-icon/animated-icon.component';
import { HotToastBaseComponent } from './components/hot-toast-base/hot-toast-base.component';
import { CheckMarkComponent } from './components/indicator/icons/checkmark/checkmark.component';
import { ErrorComponent } from './components/indicator/icons/error/error.component';
import { LoaderComponent } from './components/indicator/icons/loader/loader.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { ToastConfig } from './hot-toast.model';
import { HotToastComponent } from './hot-toast.component';
import { HotToastService } from './hot-toast.service';
import { init } from './init';
import { TemplateComponentLoaderComponent } from './load-template-or-component';
import { DynamicComponent } from './dynamic.component';

@NgModule({
  declarations: [
    HotToastComponent,
    HotToastBaseComponent,
    AnimatedIconComponent,
    IndicatorComponent,
    CheckMarkComponent,
    ErrorComponent,
    LoaderComponent,
    TemplateComponentLoaderComponent,
    DynamicComponent,
  ],
  imports: [CommonModule],
  exports: [
    HotToastComponent,
    HotToastBaseComponent,
    AnimatedIconComponent,
    IndicatorComponent,
    CheckMarkComponent,
    ErrorComponent,
    LoaderComponent,
    DynamicComponent,
  ],
  providers: [HotToastService],
})
export class HotToastModule {
  static forRoot(config?: Partial<ToastConfig>): ModuleWithProviders<HotToastModule> {
    return {
      ngModule: HotToastModule,
      providers: [
        { provide: ToastConfig, useValue: config },
        {
          provide: APP_INITIALIZER,
          useFactory: init,
          deps: [HotToastService],
          multi: true,
        },
      ],
    };
  }
}
