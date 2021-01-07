import { EventEmitter, TemplateRef, Type } from '@angular/core';
import { Observable } from 'rxjs';

export class ToastConfig {
  position: ToastPosition = 'top-center';
  reverseOrder: boolean = false;
  defaultToastOptions: DefaultToastOptions;
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

export type Renderable = string | number | TemplateRef<any> | Type<any>;

export interface Toast {
  type: ToastType;
  id: string;
  message: ValueOrFunction<Renderable, Toast>;
  icon?: Renderable;
  duration?: number;
  dismissible?: boolean;
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
  Pick<Toast, 'id' | 'icon' | 'duration' | 'dismissible' | 'role' | 'ariaLive' | 'className' | 'style' | 'iconTheme'>
>;

export type DefaultToastOptions = ToastOptions &
  {
    [key in ToastType]?: ToastOptions;
  };

export type ObservableMessages<T> = {
  loading?: Renderable;
  subscribe: ValueOrFunction<Renderable, T>;
  error?: ValueOrFunction<Renderable, any>;
  complete?: Renderable;
};

export interface HotToastServiceMethods {
  show: (message: string, options?: ToastOptions) => ToastRef;
  error: (message: string, options?: ToastOptions) => ToastRef;
  success: (message: string, options?: ToastOptions) => ToastRef;
  loading: (message: string, options?: ToastOptions) => ToastRef;
  observe: <T>(observable: Observable<T>, messages: ObservableMessages<T>, options?: ToastOptions) => ToastRef;
}

export type UpdateToastOptions = Partial<
  Pick<
    Toast,
    'icon' | 'duration' | 'dismissible' | 'role' | 'ariaLive' | 'className' | 'style' | 'iconTheme' | 'height' | 'type'
  >
>;

export interface ToastRef {
  close: () => void;
  unsubscribe?: () => void;
  updateMessage: (message: Renderable) => void;
  updateToast: (options: UpdateToastOptions) => void;
}
