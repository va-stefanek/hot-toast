import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HotToastModule } from '@ngneat/hot-toast';

import { AppComponent, IconComponent, MessageComponent } from './app.component';
import { FooterComponent } from './sections/footer/footer.component';
import {
  ExampleComponent,
  DummyComponent,
  InjectorComponent,
  DataComponent,
} from './sections/example/example.component';
import { FeaturesComponent } from './sections/features/features.component';
import { PositionComponent } from './sections/position/position.component';
import { StepsComponent } from './sections/steps/steps.component';
import { SharedModule } from './shared/shared.module';
import { ReverseOrderComponent } from './sections/reverse-order/reverse-order.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./sections/for-feature/for-feature.module').then(m => m.ForFeatureModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    IconComponent,
    MessageComponent,
    ExampleComponent,
    StepsComponent,
    FeaturesComponent,
    PositionComponent,
    DummyComponent,
    ReverseOrderComponent,
    InjectorComponent,
    DataComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, SharedModule, HotToastModule.forRoot({}), RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
