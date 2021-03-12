/* eslint-disable max-len */
import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { HotToastClose, HotToastRef, HotToastService } from '@ngneat/hot-toast';
import { from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Example {
  id: string;
  title: string;
  subtitle?: string;
  action: () => void;
  emoji: string;
  snippet: { typescript: string; html?: string };
  activeSnippet: 'typescript' | 'html';
}

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  @ViewChild('success') successTemplate;
  @ViewChild('error') errorTemplate;
  @ViewChild('template') ngTemplate;
  @ViewChild('templateContext') ngTemplateContext;

  examples: Example[] = [];

  closedEventData: HotToastClose = undefined;

  snippetLanguages: { label: string; value: 'typescript' | 'html' }[] = [
    { label: 'TypeScript', value: 'typescript' },
    { label: 'HTML', value: 'html' },
  ];

  readonly exampleLink = 'https://github.com/ngneat/hot-toast/tree/master/src/app/sections/example';

  constructor(private toast: HotToastService, private parent: Injector) {}

  ngOnInit(): void {
    const examples: Example[] = [
      {
        id: 'success',
        title: 'Success',
        subtitle: 'Opens up an hot-toast with pre-configurations for success state.',
        emoji: '✅',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  toast.success('Successfully toasted!')`,
        },
        action: () => {
          this.toast.success('Successfully toasted!');
        },
      },
      {
        id: 'warning',
        title: 'Warning',
        subtitle: 'Suitable to show warnings',
        emoji: '⚠',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  toast.warning('Please be cautious!')`,
        },
        action: () => {
          this.toast.warning('Please be cautious!');
        },
      },
      {
        id: 'error',
        title: 'Error',
        subtitle: 'Open it when you want to show any error!',
        emoji: '❌',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  toast.error("This didn't work.")`,
        },
        action: () => {
          this.toast.error(`This didn't work.`);
        },
      },
      {
        id: 'loader',
        title: 'Loader',
        subtitle: 'Useful to show any in-progress state.',
        emoji: '🔄',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
    toast.loading("I am on the 🛣 way...")`,
        },
        action: () => {
          this.toast.loading('I am on the 🛣 way...');
        },
      },
      {
        id: 'observe',
        title: 'Observe',
        subtitle: 'This is useful when you want to show the toast based on a stream, for example an http call.',
        emoji: '⏳',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  saveSettings(settings).pipe(toast.observe(
    {
      loading: 'Saving...',
      success: successTemplate,
      error: errorTemplate,
    }
  )).subscribe();`,
          html: `
  &lt;ng-template #successTemplate&gt;
    &lt;b&gt;Settings saved!&lt;/b&gt;
  &lt;/ng-template&gt;
  &lt;ng-template #errorTemplate&gt;
    &lt;b&gt;Could not save.&lt;/b&gt;
  &lt;/ng-template&gt;`,
        },
        action: () => {
          from(
            new Promise((res, rej) => {
              setTimeout(Math.random() > 0.5 ? res : rej, 1000);
            })
          )
            .pipe(
              this.toast.observe({
                loading: 'Saving...',
                success: this.successTemplate,
                error: this.errorTemplate,
              }),
              catchError((error) => of(error))
            )
            .subscribe();
        },
      },
      {
        id: 'multi',
        title: 'Multi Line',
        subtitle: `An example which demonstrates that hot-toast can handle multi-lines, too. 😎 It's advisable that you also have <b><code>autoClose: false</code></b> in such cases.`,
        emoji: '↕️',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  toast.show(
    "This toast is super big. I don't think anyone could eat it in one bite. It's larger than you expected. You eat it but it does not seem to get smaller.",
    {
      autoClose: false,
      dismissible: true
    }
  );`,
        },
        action: () => {
          this.toast.show(
            // eslint-disable-next-line max-len
            `This toast is super big.I don't think anyone could eat it in one bite. It's larger than you expected. You eat it but it does not seem to get smaller.`,
            {
              autoClose: false,
              dismissible: true,
            }
          );
        },
      },
      {
        id: 'emoji',
        title: 'Emoji',
        subtitle: 'This will show provided emoji in the hot-toast!',
        emoji: '👏',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  toast.show('Good Job!', {
    icon: '👏',
  });`,
        },
        action: () => {
          this.toast.show('Good Job!', {
            icon: '👏',
          });
        },
      },
      {
        id: 'snackbar',
        title: 'Snackbar (Dark)',
        subtitle: `Same as toast, but with dark theme. It is advisable that you use <b<code>position: 'bottom-center'</code></b> with this.`,
        emoji: '🌞',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  toast.show('Snackbar',
    {
      theme: 'snackbar',
      icon: '🌞',
      position: 'bottom-center'
    }
  )`,
        },
        action: () => {
          this.toast.show('Snackbar', { theme: 'snackbar', icon: '🌞', position: 'bottom-center' });
        },
      },
      {
        id: 'dismissible',
        title: 'Dismissible',
        subtitle: 'This will show a close button and will allow user to close the hot-toast.',
        emoji: '❎',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  toast.show('Dismissible',
    {
      autoClose: false,
      dismissible: true,
      icon: '❎',
    }
  )`,
        },
        action: () => {
          this.toast.show('Dismissible', {
            autoClose: false,
            dismissible: true,
            icon: '❎',
          });
        },
      },
      {
        id: 'events',
        title: 'Events',
        subtitle: 'Useful when you want to perform any action based on events.',
        emoji: '🔂',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  const toastRef = toast.show('Events',
    {
      dismissible: true,
      duration: 5000
    }
  );
  toastRef.afterClosed.subscribe((e) => {
    console.log(e)
  });`,
        },
        action: () => {
          const toastRef = this.toast.show('Events', { dismissible: true, duration: 5000 });
          toastRef.afterClosed.subscribe((e) => {
            console.log(e);
            this.closedEventData = e;
          });
        },
      },
      {
        id: 'themed',
        title: 'Themed',
        subtitle: `You can pass your styles so that hot-toast matches with your app's theme.`,
        emoji: '🎨',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  toast.success('Look at my styles', {
    style: {
      border: '1px solid #713200',
      padding: '16px',
      color: '#713200',
    },
    iconTheme: {
      primary: '#713200',
      secondary: '#FFFAEE',
    },
  });`,
        },
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
        id: 'toast-ref',
        title: 'Toast ref',
        subtitle: 'Perform actions like close, update message and options, etc. through your code.',
        emoji: '🕵️',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  const ref = toast.show(
    'I will be closed using ref.',
    { autoClose: false, icon: '🕵️' }
  );
  setTimeout(() => {
    ref.close();
  }, 3000);`,
        },
        action: () => {
          const ref = this.toast.show('I will be closed using ref.', { autoClose: false, icon: '🕵️' });
          setTimeout(() => {
            ref.close();
          }, 3000);
        },
      },
      {
        id: 'only-one-at-a-time',
        title: 'Only one at a time',
        subtitle: 'Pass unique id and it will show that toast only one at a time.',
        emoji: '☝',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  toast.show(
    'I can have only single toast at a time, cz I have an unique id!',
    { id: 'pause' }
  );`,
        },
        action: () => {
          this.toast.show('I can have only single toast at a time, cz I have an unique id!', { id: 'pause' });
        },
      },
      {
        id: 'persistent',
        title: 'Persistent',
        subtitle: `This allows you to show a toast, with unique id, only specific amount of times.
        This config will be stored in either local or session storage.<br>
        The <b><code>\${id}</code></b> in key will replaced with actual hot-toast id.<br>
        Lets say you want show hot-toast, with a particular id, max 3 times to a user irrespective of browser session. In this case you will set this as:<br>
        <b><code>{ enabled: true, count: 3 }</code></b>`,
        emoji: '🔢',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  toast.show('I can be opened only once across multiple browser sessions!', {
    id: 'persist-1',
    persist: { enabled: true },
  });

  // clear localStorage for current url to open it again!`,
        },
        action: () => {
          this.toast.show('I can be opened only once across multiple browser sessions!', {
            id: 'persist-1',
            persist: { enabled: true },
          });
        },
      },
      {
        id: 'html',
        title: 'HTML',
        subtitle: 'You can directly give your HTML string',
        emoji: '🔠',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  supportType = 'ground support';
  toast.show(\`
    I don't know why I am &lt;i&gt;tilted&lt;/i&gt;!
    Maybe I need some &lt;u class="bg-toast-100"&gt;\${supportType}&lt;/u&gt;.
  \`)`,
        },
        action: () => {
          const supportType = 'ground support';
          this.toast.show(
            `I don't know why I am <i>tilted</i>! Maybe I need some <u class="bg-toast-100">${supportType}</u>.`
          );
        },
      },
      {
        id: 'template',
        title: 'Template',
        subtitle:
          'You can give your template for more custom behavior. <b><code>toastRef</code></b> will be accessible in the template.',
        emoji: '🔩',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  toast.show(template, { autoClose: false });`,
          html: `
  &lt;ng-template #template let-toastRef&gt;
   Custom and &lt;b&gt;bold&lt;/b&gt;&nbsp;
   &lt;button (click)="toastRef.close({ dismissedByAction: true })"&gt;Dismiss&lt;/button&gt;
  &lt;/ng-template&gt;`,
        },
        action: () => {
          this.toast.show(this.ngTemplate, { autoClose: false });
        },
      },
      {
        id: 'template-context',
        title: 'Context',
        subtitle:
          'You can also pass your <b><code>context</code></b> for template. Please note that <b><code>$implicit</code></b> is reserved for <b><code>toastRef</code></b>',
        emoji: '🎫',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  toast.show(template, {
    autoClose: false,
    dismissible: true,
    context: { data: { fact: '1+1 = 2' } },
  });`,
          html: `
  &lt;ng-template #template let-toastRef let-data="data"&gt;
   Custom and &lt;b&gt;bold&lt;/b&gt;&nbsp;
   with data: {{ data | json }}
   &lt;button (click)="toastRef.close({ dismissedByAction: true })"&gt;Dismiss&lt;/button&gt;
  &lt;/ng-template&gt;`,
        },
        action: () => {
          this.toast.show(this.ngTemplateContext, {
            autoClose: false,
            context: { data: { fact: '1+1 = 2' } },
          });
        },
      },
      {
        id: 'component',
        title: 'Component',
        subtitle: 'Using components for messages are also supported!',
        emoji: '🆕',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  @Component({
    selector: 'app-dummy',
    template: 'Hi 👋 from the component!',
  })
  export class DummyComponent {}

  toast.show(DummyComponent);`,
        },
        action: () => {
          this.toast.show(DummyComponent);
        },
      },
      {
        id: 'injector',
        title: 'Injector',
        subtitle: 'You can also give <b><code>injector</code></b> for your component.',
        emoji: '💉',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  @Component({
    selector: 'app-root',
    template: '...',
  })
  export class AppComponent {
    constructor(private parent: Injector) {}

    injector = Injector.create({
      providers: [
        {
          provide: 'MESSAGE',
          useValue: 'I love Angular 🔥 Hot Toasts!',
        },
      ],
      parent: this.parent
    });

    showToast() {
      this.toast.show(InjectorComponent, { injector });
    }
  }

  @Component({
    selector: 'app-injector',
    template: '{{ message }}',
  })
  export class InjectorComponent {
    constructor(@Inject('MESSAGE') public message: string) {}
  }`,
        },
        action: () => {
          const injector = Injector.create({
            providers: [
              {
                provide: 'MESSAGE',
                useValue: 'I love Angular 🔥 Hot Toasts!',
              },
            ],
            parent: this.parent,
          });
          this.toast.show(InjectorComponent, { injector });
        },
      },
      {
        id: 'data',
        title: 'Data',
        subtitle:
          'Sometimes we need to pass data from the opening component to our toast component. In these cases, we can use the <b><code>data</b></code> property, and use it to pass any data we need:',
        emoji: '💾',
        activeSnippet: 'typescript',
        snippet: {
          typescript: `
  @Component({
    selector: 'app-root',
    template: '...',
  })
  export class AppComponent {
    constructor(private toast: HotToastService) {}

    showToast() {
      this.toast.show(DataComponent, {
        data: {
          fact:
            'Toast is a form of 🍞 bread that has been browned by toasting, that is, exposure to radiant 🔥 heat.',
        },
      });
    }
  }

  @Component({
    selector: 'app-data',
    template: '{{ toastRef.data.fact }}',
  })
  export class DataComponent {
    constructor(@Inject(HotToastRef) public toastRef: HotToastRef) {}
  }`,
        },
        action: () => {
          this.toast.show(DataComponent, {
            data: {
              fact:
                'Toast is a form of 🍞 bread that has been browned by toasting, that is, exposure to radiant 🔥 heat.',
            },
          });
        },
      },
    ];
    Array.prototype.push.apply(this.examples, examples);
  }

  click(e: Example) {
    e.action();
  }
}

@Component({
  selector: 'app-dummy',
  template: 'Hi 👋 from the component!',
})
export class DummyComponent {}

@Component({
  selector: 'app-injector',
  template: '{{ message }}',
})
export class InjectorComponent {
  constructor(@Inject('MESSAGE') public message: string) {}
}
@Component({
  selector: 'app-data',
  template: '{{ toastRef.data.fact }}',
})
export class DataComponent {
  constructor(@Inject(HotToastRef) public toastRef: HotToastRef) {}
}
