import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { ApiComponent } from './api/api.component';
import { GuidesComponent } from './guides/guides.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [DocsComponent, GettingStartedComponent, ApiComponent, GuidesComponent],
  imports: [CommonModule, DocsRoutingModule, MarkdownModule.forChild()],
})
export class DocsModule {}
