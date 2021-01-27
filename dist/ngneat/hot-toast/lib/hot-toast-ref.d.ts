import { Content } from '@ngneat/overview';
import { Observable } from 'rxjs';
import { HotToastContainerComponent } from './components/hot-toast-container/hot-toast-container.component';
import { HotToastClose, Toast, UpdateToastOptions, HotToastRefProps } from './hot-toast.model';
export declare class HotToastRef implements HotToastRefProps {
    private toast;
    updateMessage: (message: Content) => void;
    updateToast: (options: UpdateToastOptions) => void;
    afterClosed: Observable<HotToastClose>;
    private _dispose;
    set dispose(value: () => void);
    /** Subject for notifying the user that the toast has been closed. */
    private _onClosed;
    constructor(toast: Toast);
    getToast(): Toast;
    /**Used for internal purpose
     * Attach ToastRef to container
     */
    appendTo(container: HotToastContainerComponent): this;
    /**
     * Closes the toast
     *
     * @param [closeData={ dismissedByAction: false }] -
     * Make sure to pass { dismissedByAction: true } when closing from template
     * @memberof HotToastRef
     */
    close(closeData?: {
        dismissedByAction: boolean;
    }): void;
}
