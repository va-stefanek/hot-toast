import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  featureList = [
    'Hot by default',
    'Easy to use',
    'Accessible',
    'Emoji Support',
    'Customizable',
    'Observable API',
    'Pause on hover',
    'Events',
  ];

  constructor() {}

  ngOnInit(): void {}
}
