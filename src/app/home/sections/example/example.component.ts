import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  @ViewChild('template') ngTemplate;
  ngComponent = DummyComponent;

  examples: Example[] = [];

  snippet = '';

  readonly EXAMPLE_LINK = `https://github.com/ngneat/hot-toast/tree/${
    environment.production ? 'master' : 'development'
  }/src/app/home/sections/example`;

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
  this.ref = toast.observe(
    saveSettings(settings),
    {
      loading: 'Saving...',
      success: successTemplate,
      error: errorTemplate,
    }
  );

  ngOnDestroy() {
    this.ref.unsubscribe();
  }

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
            next: this.successTemplate,
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
      autoClose: false,
      dismissible: true
    }
  );
        `,
        action: () => {
          this.toast.show(
            "This toast is super big.I don't think anyone could eat it in one bite. It's larger than you expected. You eat it but it does not seem to get smaller.",
            {
              autoClose: false,
              dismissible: true,
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
      {
        title: 'Dismissible',
        emoji: '❎',
        snippet: `
  toast.show('Dismissible',
    {
      autoClose: false,
      dismissible: true,
      icon: '❎',
    }
  )
        `,
        action: () => {
          this.toast.show('Dismissible', {
            autoClose: false,
            dismissible: true,
            icon: '❎',
          });
        },
      },
      {
        title: 'Events',
        emoji: '🔁',
        snippet: `
  const toastRef = toast.show('Events',
    {
      dismissible: true, duration: 5000
    }
  );
  toastRef.afterClosed.subscribe((e) => {
    console.log(e)
  });
        `,
        action: () => {
          const toastRef = this.toast.show('Events', { dismissible: true, duration: 5000 });
          toastRef.afterClosed.subscribe((e) => console.log(e));
        },
      },
      {
        title: 'Themed',
        emoji: '🎨',
        snippet: `
  toast.success('Look at my styles', {
    style: {
      border: '2px solid #ff4081',
      backgroundColor: '#3f51b5',
      padding: '16px',
      color: '#fff',
    },
    icon: '&#x2714;'
    iconTheme: {
      primary: '#ff4081',
      secondary: '#fff',
    },
  });
        `,
        action: () => {
          this.toast.success('Look at my styles', {
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#713200',
            },
            iconTheme: {
              primary: '#713200',
              secondary: '#FFFAEE',
            },
          });
        },
      },
      {
        title: 'Toast ref',
        emoji: '🕵️',
        snippet: `
  const ref = toast.show(
    'I will be closed using ref.',
    { autoClose: false, icon: '🕵️' }
  );
  setTimeout(() => {
    ref.close();
  }, 3000);
        `,
        action: () => {
          const ref = this.toast.show('I will be closed using ref.', { autoClose: false, icon: '🕵️' });
          setTimeout(() => {
            ref.close();
          }, 3000);
        },
      },
      {
        title: 'Only one at a time',
        emoji: '☝',
        snippet: `
  toast.show(
    "I can have only single toast at a time,
     cz I have an unique id!",
    { id: 'pause' }
  );
        `,
        action: () => {
          this.toast.show('I can have only single toast at a time, cz I have an unique id!', { id: 'pause' });
        },
      },
      {
        title: 'Persistent',
        emoji: '🔢',
        snippet: `
  toast.show('I can be opened only once across multiple browser sessions!', {
    id: 'persist-1',
    persist: { enabled: true },
  });

  // clear localStorage for current url to open it again!
        `,
        action: () => {
          this.toast.show('I can be opened only once across multiple browser sessions!', {
            id: 'persist-1',
            persist: { enabled: true },
          });
        },
      },
      {
        title: 'Template',
        emoji: '🔩',
        snippet: `
  toast.show(template);

  // template
  // &lt;ng-template #template&gt;
  //  Custom and &lt;b&gt;bold&lt;/b&gt;
  // &lt;/ng-template&gt;
    `,
        action: () => {
          this.toast.show(this.ngTemplate);
        },
      },
      {
        title: 'Component',
        emoji: '🆕',
        snippet: `
  @Component({
    selector: 'app-dummy',
    template: 'Hi 👋 from the component!',
  })
  export class DummyComponent {}

  ngComponent = DummyComponent;

  toast.show(this.ngComponent);
    `,
        action: () => {
          this.toast.show(this.ngComponent);
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

@Component({
  selector: 'app-dummy',
  template: 'Hi 👋 from the component!',
})
export class DummyComponent {}
