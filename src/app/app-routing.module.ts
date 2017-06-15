import { NgModule }             from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { LoginPage } from './pages';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginPage }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
