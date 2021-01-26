import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-emoji-button',
  templateUrl: './emoji-button.component.html',
  styleUrls: ['./emoji-button.component.scss'],
})
export class EmojiButtonComponent {
  @Input() emoji: string;
  @Input() class: string;
  @Input() btnId: string;
  @Output() btnClick = new EventEmitter();
}
