import { Content } from '@ngneat/overview';
import { Observable, race, Subject } from 'rxjs';
import { HotToastContainerComponent } from './components/hot-toast-container/hot-toast-container.component';
import { HotToastClose, resolveValueOrFunction, Toast, UpdateToastOptions, HotToastRefProps } from './hot-toast.model';

export class HotToastRef implements HotToastRefProps {
  private _dispose: Function;
  set dispose(value: Function) {
    this._dispose = value;
  }

  unsubscribe: () => void;
  updateMessage: (message: Content) => void;
  updateToast: (options: UpdateToastOptions) => void;

  /** Subject for notifying the user that the toast has been closed. */
  private _onClosed = new Subject<HotToastClose>();
  afterClosed: Observable<HotToastClose>;

  constructor(private toast: Toast) {}

  getToast() {
    return this.toast;
  }

  /**Used for internal purpose
   * Attach ToastRef to container
   */
  appendTo(container: HotToastContainerComponent) {
    const { dispose, unsubscribe, updateMessage, updateToast, afterClosed } = container.addToast(this);

    this.dispose = dispose;
    this.unsubscribe = unsubscribe;
    this.updateMessage = updateMessage;
    this.updateToast = updateToast;
    this.afterClosed = race(this._onClosed.asObservable(), afterClosed);
    return this;
  }

  close() {
    this._dispose();
    this.unsubscribe();
    this._onClosed.next({ dismissedByAction: false, id: this.toast.id });
    this._onClosed.complete();
  }
}
