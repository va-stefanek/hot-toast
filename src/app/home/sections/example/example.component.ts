import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { from } from 'rxjs';

interface Example {
  title: string;
  action: () => void;
  emoji: string;
  snippet: string;
}

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit, AfterViewInit {
  @ViewChild('success') successTemplate;
  @ViewChild('error') errorTemplate;

  examples: Example[] = [];

  snippet = '';

  constructor(private toast: HotToastService) {}

  ngOnInit(): void {
    Array.prototype.push.apply(this.examples, [
      {
        title: 'Success',
        emoji: '✅',
        snippet: `
  toast.success('Successfully toasted!')
        `,
        action: () => {
          this.toast.success('Successfully toasted!');
        },
      },
      {
        title: 'Error',
        emoji: '❌',
        snippet: `
  toast.error("This didn't work.")
  `,
        action: () => {
          this.toast.error("This didn't work.");
        },
      },
      {
        title: 'Observe',
        emoji: '⏳',
        snippet: `
  toast.observe(
    saveSettings(settings),
    {
      loading: 'Saving...',
      success: successTemplate,
      error: errorTemplate,
    }
  );

  // template
  // &lt;ng-template #successTemplate&gt;
  //   &lt;b&gt;Settings saved!&lt;/b&gt;
  // &lt;/ng-template&gt;
  // &lt;ng-template #errorTemplate&gt;
  //   &lt;b&gt;Could not save.&lt;/b&gt;
  // &lt;/ng-template&gt;
        `,
        action: () => {
          const promise = new Promise((res, rej) => {
            setTimeout(Math.random() > 0.5 ? res : rej, 1000);
          });

          this.toast.observe(from(promise), {
            loading: 'Saving...',
            subscribe: this.successTemplate,
            error: this.errorTemplate,
          });
        },
      },
      {
        title: 'Multi Line',
        emoji: '↕️',
        snippet: `
  toast.show(
    "This toast is super big.
    I don't think anyone could eat it in one bite.
    It's larger than you expected.
    You eat it but it does not seem to get smaller.",
    {
      duration: 6000,
    }
  );
        `,
        action: () => {
          this.toast.show(
            "This toast is super big.I don't think anyone could eat it in one bite. It's larger than you expected. You eat it but it does not seem to get smaller.",
            {
              duration: 6000,
            }
          );
        },
      },
      {
        title: 'Emoji',
        emoji: '👏',
        snippet: `
  toast.show('Good Job!', {
    icon: '👏',
  });
    `,
        action: () => {
          this.toast.show('Good Job!', {
            icon: '👏',
          });
        },
      },
      {
        title: 'Snackbar (Dark)',
        emoji: '🌚',
        snippet: `
  toast.show('Snackbar',
    {
      theme: 'snackbar',
      icon: '🌚',
      position: 'bottom-center'
    }
  )
        `,
        action: () => {
          this.toast.show('Snackbar', { theme: 'snackbar', icon: '🌚', position: 'bottom-center' });
        },
      },
    ]);

    this.snippet = this.examples[0].snippet;
  }

  ngAfterViewInit(): void {}

  click(e: Example) {
    if (e.snippet) {
      this.snippet = e.snippet;
    }
    e.action();
  }
}
