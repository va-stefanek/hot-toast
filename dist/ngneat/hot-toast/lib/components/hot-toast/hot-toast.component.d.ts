import { AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import { CreateHotToastRef, HotToastClose, Toast, ToastConfig } from '../../hot-toast.model';
export declare class HotToastComponent implements AfterViewInit, OnDestroy {
    toast: Toast;
    offset: number;
    defaultConfig: ToastConfig;
    toastRef: CreateHotToastRef;
    height: EventEmitter<number>;
    beforeClosed: EventEmitter<any>;
    afterClosed: EventEmitter<HotToastClose>;
    private toastBarBase;
    isManualClose: boolean;
    ngAfterViewInit(): void;
    get containerPositionStyle(): {
        left: number;
        right?: undefined;
        justifyContent?: undefined;
        top: number;
        bottom?: undefined;
        transform: string;
    } | {
        right: number;
        left?: undefined;
        justifyContent?: undefined;
        top: number;
        bottom?: undefined;
        transform: string;
    } | {
        left: number;
        right: number;
        justifyContent: string;
        top: number;
        bottom?: undefined;
        transform: string;
    } | {
        left: number;
        right?: undefined;
        justifyContent?: undefined;
        bottom: number;
        top?: undefined;
        transform: string;
    } | {
        right: number;
        left?: undefined;
        justifyContent?: undefined;
        bottom: number;
        top?: undefined;
        transform: string;
    } | {
        left: number;
        right: number;
        justifyContent: string;
        bottom: number;
        top?: undefined;
        transform: string;
    };
    get toastBarBaseStyles(): any;
    get isIconString(): boolean;
    close(): void;
    ngOnDestroy(): void;
    private isExitAnimation;
}
