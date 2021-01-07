import { Component } from '@angular/core';
import { HotToastService, ToastOptions } from '@ngneat/hot-toast';
import { interval, timer } from 'rxjs';
import { map, share, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'toast';

  iconList = ['☝', '👇'];

  iconComponent = IconComponent;

  constructor(private toastService: HotToastService) {}

  blank(message: string, options?: ToastOptions) {
    this.toastService.show(message, options);
  }
  error() {
    this.toastService.error('Error');
  }
  success() {
    this.toastService.success('Success');
  }
  loading() {
    this.toastService.loading('Loading...');
  }
  observe() {
    const finish = timer(10000);
    const source = interval(1000);
    const observable = source.pipe(
      map(() => {
        let v = Math.random();
        // if (v > 0.5) {
        //   throw 0.5;
        // }
        return v;
      }),
      takeUntil(finish)
    );
    const shared = observable.pipe(share());
    const toastRef = this.toastService.observe(
      shared,
      {
        loading: 'Observable Loading...',
        subscribe: (v: number) => v,
        error: 'Observable Error',
        complete: 'Observable Complete',
      },
      { success: { duration: 10000 } }
    );

    setTimeout(() => {
      toastRef.close();
    }, 6000);
  }
}

@Component({
  selector: 'app-icon',
  template: '✋',
})
export class IconComponent {}
