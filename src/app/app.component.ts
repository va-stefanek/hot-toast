import { Component } from '@angular/core';
import { HotToastService, ToastOptions } from '@ngneat/hot-toast';
import { interval, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'toast';

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
  promise() {
    const promise = new Promise((res, rej) => {
      setTimeout(Math.random() > 0.5 ? res : rej, 1000);
    });
    this.toastService.promise(promise, {
      loading: 'Promise Loading...',
      success: 'Promise Success',
      error: 'Promise Error',
    });
  }
}
