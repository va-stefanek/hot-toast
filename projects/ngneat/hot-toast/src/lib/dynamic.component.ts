import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  Type,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'hot-toast-dynamic',
  template: '',
})
export class DynamicComponent implements OnChanges {
  @Input()
  dynamicComponent: Type<any>;

  @Output()
  dynamicCreated: EventEmitter<ComponentRef<any>> = new EventEmitter();

  componentRef: ComponentRef<any> | null;

  constructor(private vcr: ViewContainerRef, private cfr: ComponentFactoryResolver) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dynamicComponent) {
      this.createDynamicComponent();
    }
  }

  createDynamicComponent() {
    this.vcr.clear();
    this.componentRef = null;

    if (this.dynamicComponent) {
      this.componentRef = this.vcr.createComponent(this.cfr.resolveComponentFactory(this.dynamicComponent));
      this.dynamicCreated.emit(this.componentRef);
    }
  }
}
