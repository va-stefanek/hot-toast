import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-reverse-order',
  templateUrl: './reverse-order.component.html',
})
export class ReverseOrderComponent {
  reversOrder: boolean;
  constructor(private toast: HotToastService) {
    this.reversOrder = this.toast.defaultConfig.reverseOrder;
  }

  get snippet() {
    return `
  import { HotToastModule } from '@ngneat/hot-toast';

  @NgModule({
    imports: [
      HotToastModule.forRoot(
          {
            reverseOrder: ${this.reversOrder},
          }
        )
      ],
  })

  export class AppModule {}`;
  }

  get serviceSnippet() {
    return `
  import { Component } from '@angular/core';
  import { HotToastService } from '@ngneat/hot-toast';
  @Component({
    selector: 'app-root'
  })
  export class AppComponent {

    constructor(private toast: HotToastService) {
      this.toast.defaultConfig = {
        ...this.toast.defaultConfig,
        reverseOrder: ${this.reversOrder}
      };
    }
  }`;
  }

  toggleOrder() {
    this.reversOrder = !this.reversOrder;

    this.toast.defaultConfig = { ...this.toast.defaultConfig, reverseOrder: this.reversOrder };

    this.showToasts();
  }

  private showToasts() {
    ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].forEach((num, i) => {
      setTimeout(() => {
        this.toast.show('Notification ' + (i + 1), { icon: num });
      }, i * 250);
    });
  }
}
