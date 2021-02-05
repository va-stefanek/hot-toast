import { ModuleWithProviders } from '@angular/core';
import { ToastConfig } from './hot-toast.model';
import { HotToastService } from './hot-toast.service';
export declare class HotToastModule {
    constructor(service: HotToastService);
    static forRoot(config?: Partial<ToastConfig>): ModuleWithProviders<HotToastModule>;
}
