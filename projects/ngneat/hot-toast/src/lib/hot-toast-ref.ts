import { Content } from '@ngneat/overview';
import { Observable, race, Subject } from 'rxjs';
import { HotToastContainerComponent } from './components/hot-toast-container/hot-toast-container.component';
import { Toast, UpdateToastOptions, _HotToastRef } from './hot-toast.model';

export class HotToastRef {
  private dispose: Function;

  /**Unsubscribes from observable, if any. */
  unsubscribe: () => void;
  /**Updates only message */
  updateMessage: (message: Content) => void;
  /**Update updatable options of toast */
  updateToast: (options: UpdateToastOptions) => void;

  /** Subject for notifying the user that the toast has been closed. */
  private _onClosed = new Subject<string>();
  afterClosed: Observable<string>;

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

  /**Closes the toast */
  close() {
    this.dispose();
    this._onClosed.next(this.toast.id);
    this._onClosed.complete();
  }
}
