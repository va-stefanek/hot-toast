import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export class ToastConfig {
  position: ToastPosition = 'top-center';
  reverseOrder: boolean = false;
}

export type ToastType = 'success' | 'error' | 'loading' | 'blank';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface IconTheme {
  primary: string;
  secondary: string;
}

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

const isFunction = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> => typeof valOrFunction === 'function';

export const resolveValueOrFunction = <TValue, TArg>(valOrFunction: ValueOrFunction<TValue, TArg>, arg: TArg): TValue =>
  isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;

export type Renderable = TemplateRef<any> | string | number | null;

export interface Toast {
  type: ToastType;
  id: string;
  message: ValueOrFunction<Renderable, Toast>;
  icon?: Renderable;
  duration?: number;
  pauseDuration: number;

  role: 'status' | 'alert';
  ariaLive: 'assertive' | 'off' | 'polite';

  style?: any;
  className?: string;
  iconTheme?: IconTheme;

  createdAt: number;
  visible: boolean;
  height?: number;
  width?: number;
}

export type ToastOptions = Partial<
  Pick<Toast, 'id' | 'icon' | 'duration' | 'role' | 'ariaLive' | 'className' | 'style' | 'iconTheme'>
>;

export type PromiseMessage<T> = {
  loading: Renderable;
  success: ValueOrFunction<Renderable, T>;
  error: ValueOrFunction<Renderable, any>;
};

export type ObservableMessages<T> = {
  loading: Renderable;
  subscribe: ValueOrFunction<Renderable, T>;
  error: ValueOrFunction<Renderable, any>;
};

export interface HotToastServiceMethods {
  show: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  success: (message: string, options?: ToastOptions) => string;
  loading: (message: string, options?: ToastOptions) => string;
  promise: <T>(promise: Promise<T>, messages: PromiseMessage<T>, options?: ToastOptions) => string;
  observable: <T>(observable: Observable<T>, messages: ObservableMessages<T>, options?: ToastOptions) => string;
  hide: (toastId: string) => void;
}
