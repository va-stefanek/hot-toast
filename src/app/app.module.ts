import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HotToastModule } from '@ngneat/hot-toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './sections/footer/footer.component';

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HotToastModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
