import { Component, Input } from '@angular/core';
import { IconTheme, ToastType } from '../../hot-toast.model';

@Component({
  selector: 'lib-hot-toast-indicator',
  templateUrl: 'indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent {
  @Input() theme: IconTheme;
  @Input() type: ToastType;
}
