import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, IconComponent } from './app.component';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  declarations: [AppComponent, IconComponent],
  imports: [BrowserModule, AppRoutingModule, HotToastModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
