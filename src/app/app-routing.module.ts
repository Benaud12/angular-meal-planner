import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent }   from './components/groups/groups.component';

const routes: Routes = [
  { path: '', redirectTo: '/groups', pathMatch: 'full' },
  { path: 'groups',  component: GroupsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
