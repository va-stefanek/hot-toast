import { Component } from '@angular/core';
import { HotToastService, ToastOptions } from '@ngneat/hot-toast';
import { from } from 'rxjs';
import { share } from 'rxjs/operators';
import { version } from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'toast';

  iconList = ['☝', '👇'];

  iconComponent = IconComponent;

  msgComponent = MessageComponent;

  featureList = [
    'Hot by default',
    'Easy to use',
    'Accessible',
    'Emoji Support',
    'Customizable',
    'Observable API',
    'Pause on hover',
    'Events',
  ];

  stepList: { title: string; subTitle: string; code: string; language: string }[] = [
    {
      title: 'Install package',
      subTitle: 'It weighs less than ??kb',
      code: 'npm i @ngneat/hot-toast',
      language: 'bash',
    },
    {
      title: 'Import Toaster in your app',
      subTitle: 'You can set options here',
      code: `
// ..
import { HotToastModule } from '@ngneat/hot-toast';

// ...
@NgModule({
  imports: [BrowserModule, HotToastModule.forRoot()],
})

// ...
      `,
      language: 'typescript',
    },
    {
      title: 'Start toasting!',
      subTitle: 'Call it from anywhere in the component',
      code: `
// ...
import { HotToastService } from '@ngneat/hot-toast';

@Component({})
export class AppComponent {
  constructor(private toastService: HotToastService) {}
}

showToast() {
  this.toastService.show('Hello World!')
}
      `,
      language: 'typescript',
    },
  ];

  version = version;

  constructor(private toastService: HotToastService) {}

  blank(message: string, options?: ToastOptions) {
    this.toastService.show(message, options);
  }
  error(message: string, options?: ToastOptions) {
    this.toastService.error(message, options);
  }
  success(message: string, options?: ToastOptions) {
    this.toastService.success(message, options);
  }
  loading() {
    this.toastService.loading('Loading...');
  }
  observe() {
    const promise = new Promise((res, rej) => {
      if (Math.random() < 0.85) {
        setTimeout(res, 1000);
      } else {
        setTimeout(rej, 3000);
      }
    });
    const observable = from(promise);
    const shared = observable.pipe(share());
    const toastRef = this.toastService.observe(
      shared,
      {
        loading: 'Preparing toast',
        error: 'Whoops, it burnt',
        subscribe: "Here's your toast",
      },
      {
        style: {
          width: '200px',
          paddingRight: '10px',
        },
      }
    );
  }
}

@Component({
  selector: 'app-icon',
  template: '✋',
})
export class IconComponent {}
@Component({
  selector: 'app-msg',
  template: 'Hey, how are you?',
})
export class MessageComponent {}
