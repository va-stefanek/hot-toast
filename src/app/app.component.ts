import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { REPO_URL } from './core/constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly repoUrl = REPO_URL;

  constructor(private toast: HotToastService) {}

  observe() {
    const promise = new Promise((res, rej) => {
      if (Math.random() < 0.85) {
        setTimeout(res, 2000);
      } else {
        setTimeout(rej, 2000);
      }
    });
    from(promise)
      .pipe(
        this.toast.observe({
          loading: { content: 'Preparing toast', style: { width: '200px' } },
          error: { content: 'Whoops, it burnt', style: { width: '200px' } },
          success: { content: `Here's your toast`, style: { width: '200px' } },
        }),
        catchError((error) => of(error))
      )
      .subscribe();
  }

  ngOnInit() {
    this.observe();
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
