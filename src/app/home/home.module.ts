import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent, IconComponent, MessageComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { DummyComponent, ExampleComponent } from './sections/example/example.component';
import { StepsComponent } from './sections/steps/steps.component';
import { FeaturesComponent } from './sections/features/features.component';
import { PositionComponent } from './sections/position/position.component';

@NgModule({
  declarations: [
    HomeComponent,
    IconComponent,
    MessageComponent,
    ExampleComponent,
    StepsComponent,
    FeaturesComponent,
    PositionComponent,
    DummyComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
