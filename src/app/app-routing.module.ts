import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureselectorComponent } from './components/featureselector/featureselector.component';

const routes: Routes = [
  { path: 'selector', pathMatch: 'full', component: FeatureselectorComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
