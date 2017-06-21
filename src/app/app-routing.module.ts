import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthRouteGuard } from './auth-route.guard';

import { LoginPage, WeekPage } from './pages';

const routes: Routes = [
  { path: '', redirectTo: '/week', pathMatch: 'full' },
  { path: 'login',  component: LoginPage },
  { path: 'week',  component: WeekPage, canActivate: [AuthRouteGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
