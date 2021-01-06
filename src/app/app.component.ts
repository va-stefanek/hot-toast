import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'toast';
  count = 1;

  constructor(private toastService: HotToastService) {}

  blank() {
    this.toastService.show('Blank toast no.' + this.count++);
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
}
