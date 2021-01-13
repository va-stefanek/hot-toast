import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-emoji-button',
  templateUrl: './emoji-button.component.html',
  styleUrls: ['./emoji-button.component.scss'],
})
export class EmojiButtonComponent implements OnInit {
  @Input() emoji: string;
  @Input() class: string;
  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
