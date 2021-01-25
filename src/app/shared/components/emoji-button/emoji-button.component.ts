import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-emoji-button',
  templateUrl: './emoji-button.component.html',
  styleUrls: ['./emoji-button.component.scss'],
})
export class EmojiButtonComponent implements OnInit {
  @Input() emoji: string;
  @Input() class: string;
  @Input() btnId: string;
  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
