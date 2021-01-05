import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Optional,
} from '@angular/core';
import { ToastConfig } from './hot-tast.model';
import { HotToastComponent } from './hot-toast.component';

@Injectable()
export class HotToastService {
  constructor(private injector: Injector, @Optional() config: ToastConfig) {}

  init() {
    const appRef = this.injector.get(ApplicationRef);
    const componentFactoryResolver = this.injector.get(ComponentFactoryResolver);

    const componentRef = componentFactoryResolver.resolveComponentFactory(HotToastComponent).create(this.injector);

    appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }
}
