import { Component, OnInit } from '@angular/core';
import { HotToastService, ToastPosition } from '@ngneat/hot-toast';

interface Position {
  title: ToastPosition;
  action: () => void;
  emoji: string;
  snippet: string;
}

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit {
  positionExamples: Position[] = [
    {
      title: 'top-left',
      emoji: '↖',
      snippet: `
 toast.show('I am on top-left',
    {
      icon: '↖',
      position: 'top-left'
    }
  )
      `,
      action: () => {
        this.toast.show('I am on top-left', { icon: '↖', position: 'top-left' });
      },
    },
    {
      title: 'top-center',
      emoji: '⬆',
      snippet: `
 toast.show('I am on top-center',
    {
      icon: '⬆',
      position: 'top-center'
    }
  )
      `,
      action: () => {
        this.toast.show('I am on top-center', { icon: '⬆', position: 'top-center' });
      },
    },
    {
      title: 'top-right',
      emoji: '↗',
      snippet: `
 toast.show('I am on top-right',
    {
      icon: '↗',
      position: 'top-right'
    }
  )
      `,
      action: () => {
        this.toast.show('I am on top-right', { icon: '↗', position: 'top-right' });
      },
    },
    {
      title: 'bottom-left',
      emoji: '↙',
      snippet: `
 toast.show('I am on bottom-left',
    {
      icon: '↙',
      position: 'bottom-left'
    }
  )
      `,
      action: () => {
        this.toast.show('I am on bottom-left', { icon: '↙', position: 'bottom-left' });
      },
    },
    {
      title: 'bottom-center',
      emoji: '⬇',
      snippet: `
 toast.show('I am on bottom-center',
    {
      icon: '⬇',
      position: 'bottom-center'
    }
  )
      `,
      action: () => {
        this.toast.show('I am on bottom-center', { icon: '⬇', position: 'bottom-center' });
      },
    },
    {
      title: 'bottom-right',
      emoji: '↘',
      snippet: `
 toast.show('I am on bottom-right',
    {
      icon: '↘',
      position: 'bottom-right'
    }
  )
      `,
      action: () => {
        this.toast.show('I am on bottom-right', { icon: '↘', position: 'bottom-right' });
      },
    },
  ];

  snippet = this.positionExamples[0].snippet;
  position: ToastPosition = 'top-left';
  globalSnippet = `
  // ..
  import { HotToastModule } from '@ngneat/hot-toast';

  // ...
  @NgModule({
    imports: [
      //...,
      HotToastModule.forRoot(
          {
            position: 'top-left',
            reverseOrder: true,
          }
        )
      ],
  })

  // ...
  `;

  constructor(private toast: HotToastService) {}

  ngOnInit(): void {}

  setSnippet(pos: Position) {
    if (pos.snippet) {
      this.snippet = pos.snippet;
    }
    this.position = pos.title;
    pos.action();
  }

  toggleDirection() {}
}
