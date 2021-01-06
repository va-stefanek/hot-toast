import { Component, Input, OnInit } from '@angular/core';
import { IconTheme } from '../../../../hot-tast.model';

@Component({
  selector: 'lib-hot-toast-error',
  templateUrl: 'error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  @Input() theme: IconTheme;

  constructor() {}

  ngOnInit() {}
}
