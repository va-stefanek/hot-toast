import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'hot-toast-checkmark',
  templateUrl: './checkmark.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckMarkComponent {
  @Input() theme: IconTheme;
}
