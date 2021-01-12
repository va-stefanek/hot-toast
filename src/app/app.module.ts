import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, IconComponent, MessageComponent } from './app.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, IconComponent, MessageComponent],
  imports: [BrowserModule, AppRoutingModule, HotToastModule.forRoot(), SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
