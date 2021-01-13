import { Component, OnInit } from '@angular/core';
import { REPO_URL } from '../core/constants';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent implements OnInit {
  REPO_URL = REPO_URL;

  links: { url: string; label: string }[] = [
    {
      url: '/docs/getting-started',
      label: 'Getting Started',
    },
    {
      url: '/docs/api',
      label: 'API',
    },
    {
      url: '/docs/guides',
      label: 'Guides',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
