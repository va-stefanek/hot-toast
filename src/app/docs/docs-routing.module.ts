import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiComponent } from './api/api.component';

import { DocsComponent } from './docs.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { GuidesComponent } from './guides/guides.component';

const routes: Routes = [
  {
    path: '',
    component: DocsComponent,
    children: [
      {
        path: 'getting-started',
        component: GettingStartedComponent,
        data: { label: 'Getting Started' },
      },
      {
        path: 'api',
        component: ApiComponent,
        data: { label: 'API' },
      },
      {
        path: 'guides',
        component: GuidesComponent,
        data: { label: 'Guides' },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'getting-started',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocsRoutingModule {}
