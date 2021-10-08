import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './books/auth/auth.component';
import { UserComponent } from './books/auth/user/user.component';

import { LandingComponent } from './books/landing/landing.component';
import { ScanningComponent } from './books/scanning/scanning.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'scanning', component: ScanningComponent },
  { path: 'login', component: AuthComponent },
  { path: 'user', component: UserComponent },
  { path: '**', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
