import { Component, Input, OnInit } from '@angular/core';
import { Renderable } from './hot-toast.model';
import { isComponent, isTemplateRef } from './utils';

@Component({
  selector: 'hot-toast-template-component-loader',
  template: `
    <ng-container *ngIf="isString; else templateOrComponent">
      {{ content }}
    </ng-container>
    <ng-template #templateOrComponent>
      <ng-container *ngIf="isTemplateRef(content)">
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </ng-container>
      <ng-container *ngIf="isComponent(content)">
        <hot-toast-dynamic [dynamicComponent]="content"></hot-toast-dynamic>
      </ng-container>
    </ng-template>
  `,
})
export class TemplateComponentLoaderComponent implements OnInit {
  @Input() content: Renderable;

  isTemplateRef = isTemplateRef;
  isComponent = isComponent;

  get isString() {
    return typeof this.content === 'string' || typeof this.content === 'number';
  }

  constructor() {}

  ngOnInit() {}
}
