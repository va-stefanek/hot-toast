import { ChangeDetectorRef, QueryList } from '@angular/core';
import { HotToastClose, Toast, ToastConfig, ToastPosition, AddToastRef, CreateHotToastRef } from '../../hot-toast.model';
import { HotToastRef } from '../../hot-toast-ref';
import { HotToastComponent } from '../hot-toast/hot-toast.component';
export declare class HotToastContainerComponent {
    private cdr;
    defaultConfig: ToastConfig;
    hotToastComponentList: QueryList<HotToastComponent>;
    toasts: Toast[];
    toastRefs: CreateHotToastRef[];
    /** Subject for notifying the user that the toast has been closed. */
    private _onClosed;
    private onClosed$;
    constructor(cdr: ChangeDetectorRef);
    trackById(index: number, toast: Toast): string;
    calculateOffset(toastId: string, position: ToastPosition): number;
    updateHeight(height: number, toast: Toast): void;
    addToast(ref: HotToastRef): AddToastRef;
    closeToast(id: string): void;
    beforeClosed(toast: Toast): void;
    afterClosed(closeToast: HotToastClose): void;
    hasToast(id: string): boolean;
    private getAfterClosed;
    private updateToasts;
}
