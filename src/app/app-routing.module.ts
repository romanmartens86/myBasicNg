import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './books/landing/landing.component';
import { ScanningComponent } from './books/scanning/scanning.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'scanning', component: ScanningComponent },
  { path: '**', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
