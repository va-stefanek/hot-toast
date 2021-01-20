import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hot-toast-animated-icon',
  templateUrl: './animated-icon.component.html',
  styleUrls: ['./animated-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedIconComponent {}
