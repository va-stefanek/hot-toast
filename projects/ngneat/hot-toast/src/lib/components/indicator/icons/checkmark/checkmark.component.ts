import { Component, Input, OnInit } from '@angular/core';
import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'lib-hot-toast-checkmark',
  templateUrl: 'checkmark.component.html',
  styleUrls: ['./checkmark.component.scss'],
})
export class CheckMarkComponent implements OnInit {
  @Input() theme: IconTheme;

  constructor() {}

  ngOnInit() {}
}
