import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeComponent } from './components/code/code.component';
import { HtmlPipe } from './pipes/html.pipe';
import { EmojiButtonComponent } from './components/emoji-button/emoji-button.component';

@NgModule({
  declarations: [CodeComponent, HtmlPipe, EmojiButtonComponent],
  imports: [CommonModule],
  exports: [CodeComponent, HtmlPipe, EmojiButtonComponent],
})
export class SharedModule {}
