import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HotToastModule.forRoot({ position: 'bottom-left' })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
