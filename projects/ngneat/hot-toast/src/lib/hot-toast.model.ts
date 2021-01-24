import { Content } from '@ngneat/overview';
import { Observable } from 'rxjs';

export class ToastConfig implements DefaultToastOptions {
  /**
   * Sets the reverse order for hot-toast stacking
   * @default false
   */
  reverseOrder: boolean = false;

  ariaLive: ToastAriaLive = 'polite';
  role: ToastRole = 'status';
  position: ToastPosition = 'top-center';
  className: string;
  closeStyle: any;
  dismissible: boolean;
  autoClose: boolean = true;
  duration: number;
  icon: Content;
  iconTheme: IconTheme;
  style: any;
  theme: ToastTheme = 'toast';

  // key in ToastType
  success?: ToastOptions;
  error?: ToastOptions;
  loading?: ToastOptions;
  blank?: ToastOptions;
}

export type ToastType = 'success' | 'error' | 'loading' | 'blank';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type IconTheme = {
  primary: string;
  secondary?: string;
};

export type ToastTheme = 'toast' | 'snackbar';

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

const isFunction = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> => typeof valOrFunction === 'function';

export const resolveValueOrFunction = <TValue, TArg>(valOrFunction: ValueOrFunction<TValue, TArg>, arg: TArg): TValue =>
  isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;

export type ToastRole = 'status' | 'alert';

export type ToastAriaLive = 'assertive' | 'off' | 'polite';

export interface Toast {
  type: ToastType;

  /**
   * Unique id to associate with hot-toast.
   * There can't be multiple hot-toasts opened with same id.
   * @default Date.now().toString()
   */
  id: string;

  /** The message to show in the hot-toast. */
  message: ToastMessage;

  /**
   * Role of the live region.
   * @default status
   */
  role: ToastRole;

  /** aria-live value for the live region.
   * @default polite
   */
  ariaLive: ToastAriaLive;

  /**Icon to show in the hot-toast */
  icon?: Content;

  /**
   * Duration in milliseconds after which hot-toast will be auto closed.
   * Can be disabled via `autoClose: false`
   * @default 3000 | error = 4000 | loading = 30000
   */
  duration?: number;

  /**
   * Show close button in hot-toast
   * @default false
   */
  dismissible?: boolean;

  /**
   * Auto close hot-toast after duration
   * @default true
   */
  autoClose?: boolean;

  /**Extra styles to apply for hot-toast */
  style?: any;

  /**Extra CSS classes to be added to the hot toast container. */
  className?: string;

  /**Use this to change icon color */
  iconTheme?: IconTheme;

  /**
   * Visual appearance of hot-toast
   * @default toast
   */
  theme?: ToastTheme;

  /**
   * The position to place the hot-toast.
   *  @default top-center
   */
  position?: ToastPosition;

  /**Extra styles to apply for close button */
  closeStyle?: any;

  createdAt: number;
  visible: boolean;
  height?: number;

  /**Observable to which subscription will happen and messages will be displayed according to observableMessages */
  observable?: Observable<unknown>;
  observableMessages?: ObservableMessages<unknown>;

  /**
   * Useful when you want to keep a persistance for toast based on ids, across sessions.
   * @example
   * // Lets say you want show hot-toast, with a particular id, max 3 times to a user irrespective of browser session. In this case you will set this as:
   * { enabled: true, count: 3 }
   *
   * @type {ToastPersistConfig}
   */
  persist?: ToastPersistConfig;
}

export type ToastMessage = ValueOrFunction<Content, ToastMessageInput>;

export type ToastMessageInput = Pick<HotToastRefProps, 'getToast'>;

export type ToastOptions = Partial<
  Pick<
    Toast,
    | 'id'
    | 'icon'
    | 'duration'
    | 'dismissible'
    | 'autoClose'
    | 'role'
    | 'ariaLive'
    | 'className'
    | 'style'
    | 'iconTheme'
    | 'theme'
    | 'position'
    | 'closeStyle'
    | 'persist'
  >
>;

export type DefaultToastOptions = ToastOptions &
  {
    [key in ToastType]?: ToastOptions;
  };

export type ObservableMessages<T> = {
  loading?: Content;
  next: ValueOrFunction<Content, T>;
  error?: ValueOrFunction<Content, any>;
};

export interface HotToastServiceMethods {
  show: (message: ToastMessage, options?: ToastOptions) => CreateHotToastRef;
  error: (message: ToastMessage, options?: ToastOptions) => CreateHotToastRef;
  success: (message: ToastMessage, options?: ToastOptions) => CreateHotToastRef;
  loading: (message: ToastMessage, options?: ToastOptions) => CreateHotToastRef;
  observe: <T>(observable: Observable<T>, messages: ObservableMessages<T>, options?: ToastOptions) => CreateHotToastRef;
}

export type UpdateToastOptions = Partial<
  Pick<
    Toast,
    'icon' | 'duration' | 'dismissible' | 'className' | 'style' | 'iconTheme' | 'type' | 'theme' | 'closeStyle'
  >
>;

export interface HotToastRefProps {
  /** Returns all the toast options */
  getToast: () => Toast;
  dispose: Function;
  /**Unsubscribes from observable, if any. */
  unsubscribe: () => void;
  /**Updates only message */
  updateMessage: (message: Content) => void;
  /**Update updatable options of toast */
  updateToast: (options: UpdateToastOptions) => void;
  /** Observable for notifying the user that the toast has been closed. */
  afterClosed: Observable<HotToastClose>;
  /**Closes the toast */
  close: () => void;
}

/** Event that is emitted when a snack bar is dismissed. */
export interface HotToastClose {
  /** Whether the snack bar was dismissed using the action button. */
  dismissedByAction: boolean;
  id: string;
}

export class ToastPersistConfig {
  /**
   *In which storage id vs. counts should be stored
   *
   * @type {('local' | 'session')}
   * @memberof ToastPersistConfig
   * @default 'local'
   */
  storage?: 'local' | 'session' = 'local';

  /**
   *The key pattern to store object in storage. `${id}` in pattern is replaced with actual toast id.
   *
   * @type {('local' | 'session')}
   * @memberof ToastPersistConfig
   * @default 'ngneat/hottoast-${id}'
   */
  key?: string = 'ngneat/hototast-${id}';

  /**
   *The number of toasts allowed to show.
   *
   * @memberof ToastPersistConfig
   * @default 1
   */
  count? = 1;

  enabled = false;
}

export type AddToastRef = Omit<Omit<HotToastRefProps, 'close'>, 'getToast'>;

export type CreateHotToastRef = Omit<Omit<HotToastRefProps, 'appendTo'>, 'dispose'>;
