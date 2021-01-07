import { TemplateRef } from '@angular/core';

export function isTemplateRef(value) {
  return value instanceof TemplateRef;
}
export function isComponent(value) {
  return typeof value === 'function';
}
