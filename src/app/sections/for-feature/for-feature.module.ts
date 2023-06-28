import { NgModule } from '@angular/core';
import { ForFeatureComponent } from './for-feature.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ForFeatureComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HotToastModule.forFeature({
    style: {
      border: '4px solid #713200'
    }
  }), SharedModule],
  exports: [
    ForFeatureComponent,
    RouterModule
  ],
  declarations: [ForFeatureComponent]
})
export class ForFeatureModule {}
