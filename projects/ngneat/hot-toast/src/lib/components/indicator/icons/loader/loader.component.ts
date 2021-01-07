import { Component, Input, OnInit } from '@angular/core';
import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'lib-hot-toast-loader',
  template: `<div
    class="hot-toast-loader-icon"
    [ngStyle]="{ 'border-color': theme?.primary || '#e0e0e0', 'border-right-color': theme?.secondary || '#616161' }"
  ></div> `,
  styles: [
    `
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .hot-toast-loader-icon {
        width: 12px;
        height: 12px;
        box-sizing: border-box;
        border: 2px solid;
        border-radius: 100%;
        border-color: #e0e0e0;
        border-right-color: #616161;
        animation: rotate 1s linear infinite;
      }
    `,
  ],
})
export class LoaderComponent implements OnInit {
  @Input() theme: IconTheme;

  constructor() {}

  ngOnInit() {}
}
