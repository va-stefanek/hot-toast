import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeComponent } from './components/code/code.component';
import { HtmlPipe } from './pipes/html.pipe';

@NgModule({
  declarations: [CodeComponent, HtmlPipe],
  imports: [CommonModule],
  exports: [CodeComponent, HtmlPipe],
})
export class SharedModule {}
