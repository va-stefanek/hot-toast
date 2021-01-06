import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HotToastBaseComponent } from './components/hot-toast-base/hot-toast-base.component';
import { ToastConfig } from './hot-tast.model';
import { HotToastComponent } from './hot-toast.component';
import { HotToastService } from './hot-toast.service';
import { init } from './init';

@NgModule({
  declarations: [HotToastComponent, HotToastBaseComponent],
  imports: [CommonModule],
  exports: [HotToastComponent, HotToastBaseComponent],
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
