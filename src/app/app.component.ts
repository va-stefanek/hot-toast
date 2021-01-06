import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { interval, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'toast';
  count = 1;
  blankToastId: string;

  constructor(private toastService: HotToastService) {}

  blank() {
    this.blankToastId = this.toastService.show('Blank toast no.' + this.count++);
  }
  hideBlank() {
    if (this.blankToastId) {
      this.toastService.hide(this.blankToastId);
    }
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
