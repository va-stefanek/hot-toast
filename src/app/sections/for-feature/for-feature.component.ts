import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-for-feature',
  templateUrl: './for-feature.component.html',
})
export class ForFeatureComponent {
  constructor(private toast: HotToastService) {}

  get snippet() {
    return `
  import { HotToastModule } from '@ngneat/hot-toast';

  @NgModule({
    imports: [
      HotToastModule.ForFeature(
          {
            style: {
              border: '4px solid #713200'
            }
          }
        )
      ],
  })

  export class LazyModule {}`;
  }

  showToastForFeature(): void {
    this.toast.show('This is forFeature Toast');
  }
}
