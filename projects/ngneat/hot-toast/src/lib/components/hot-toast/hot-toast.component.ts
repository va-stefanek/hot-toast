import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { isComponent, isTemplateRef } from '@ngneat/overview';
import { ENTER_ANIMATION_DURATION, EXIT_ANIMATION_DURATION } from '../../constants';
import { HotToastRef } from '../../hot-toast-ref';
import { CreateHotToastRef, HotToastClose, Toast, ToastConfig } from '../../hot-toast.model';
import { animate } from '../../utils';

@Component({
  selector: 'hot-toast',
  templateUrl: 'hot-toast.component.html',
  styleUrls: ['./hot-toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotToastComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() toast: Toast<unknown>;
  @Input() offset = 0;
  @Input() defaultConfig: ToastConfig;
  @Input() toastRef: CreateHotToastRef<unknown>;

  @Output() height = new EventEmitter<number>();
  @Output() beforeClosed = new EventEmitter();
  @Output() afterClosed = new EventEmitter<HotToastClose>();

  @ViewChild('hotToastBarBase') private toastBarBase: ElementRef<HTMLElement>;

  isManualClose = false;
  context: Record<string, any>;
  toastComponentInjector: Injector;

  constructor(private injector: Injector, private renderer: Renderer2) {}

  ngOnInit() {
    if (isTemplateRef(this.toast.message)) {
      this.context = { $implicit: this.toastRef };
    }
    if (isComponent(this.toast.message)) {
      this.toastComponentInjector = Injector.create({
        providers: [
          {
            provide: HotToastRef,
            useValue: this.toastRef,
          },
        ],
        parent: this.toast.injector || this.injector,
      });
    }
  }

  ngAfterViewInit() {
    const nativeElement = this.toastBarBase.nativeElement;
    setTimeout(() => {
      this.height.emit(nativeElement.offsetHeight);
    });
    nativeElement.addEventListener('animationstart', (ev: AnimationEvent) => {
      if (this.isExitAnimation(ev)) {
        this.beforeClosed.emit();
      }
    });
    nativeElement.addEventListener('animationend', (ev: AnimationEvent) => {
      if (this.isExitAnimation(ev)) {
        this.afterClosed.emit({ dismissedByAction: this.isManualClose, id: this.toast.id });
      }
    });

    const toastAttributes = this.toast.attributes;
    if (toastAttributes) {
      this.setToastAttributes(toastAttributes);
    }
  }

  get containerPositionStyle() {
    const top = this.toast.position.includes('top');
    const verticalStyle = top ? { top: 0 } : { bottom: 0 };

    const horizontalStyle = this.toast.position.includes('left')
      ? {
          left: 0,
        }
      : this.toast.position.includes('right')
      ? {
          right: 0,
        }
      : {
          left: 0,
          right: 0,
          justifyContent: 'center',
        };
    return {
      transform: `translateY(${this.offset * (top ? 1 : -1)}px)`,
      ...verticalStyle,
      ...horizontalStyle,
    };
  }

  get toastBarBaseStyles() {
    const top = this.toast.position.includes('top');

    const enterAnimation = `hotToastEnterAnimation${
      top ? 'Negative' : 'Positive'
    } ${ENTER_ANIMATION_DURATION}ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards`;

    const exitAnimation = `hotToastExitAnimation${
      top ? 'Negative' : 'Positive'
    } ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1) ${this.toast.duration}ms`;

    const animation = this.toast.autoClose ? `${enterAnimation}, ${exitAnimation}` : enterAnimation;

    return { ...this.toast.style, animation };
  }

  get isIconString() {
    return typeof this.toast.icon === 'string';
  }

  close() {
    this.isManualClose = true;
    const top = this.toast.position.includes('top');

    const exitAnimation = `hotToastExitAnimation${
      top ? 'Negative' : 'Positive'
    } ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1)`;

    const nativeElement = this.toastBarBase.nativeElement;

    animate(nativeElement, exitAnimation);
  }

  ngOnDestroy() {
    this.close();
  }

  private isExitAnimation(ev: AnimationEvent) {
    return ev.animationName.includes('hotToastExitAnimation');
  }

  private setToastAttributes(toastAttributes: Record<string, string>) {
    for (const attributesKey in toastAttributes) {
      if (toastAttributes.hasOwnProperty(attributesKey)) {
        this.renderer.setAttribute(this.toastBarBase.nativeElement, attributesKey, toastAttributes[attributesKey]);
      }
    }
  }
}
