import { Component, Input, OnInit } from '@angular/core';
import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'lib-hot-toast-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() theme: IconTheme;

  constructor() {}

  ngOnInit() {}
}
