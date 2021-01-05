import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ToastConfig } from './hot-tast.model';
import { HotToastComponent } from './hot-toast.component';
import { HotToastService } from './hot-toast.service';
import { init } from './init';

@NgModule({
  declarations: [HotToastComponent],
  imports: [],
  exports: [HotToastComponent],
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
