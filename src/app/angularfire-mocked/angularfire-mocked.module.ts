import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy } from '@angular/common';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {
  AngularFireAuthMocked,
  AngularFireDatabaseMocked,
  MockDataService,
  ScenarioService } from './services';

@NgModule({
  imports: [ HttpModule ],
  providers: [
    {
    provide: AngularFireAuth,
    useClass: AngularFireAuthMocked
    },
    {
      provide: AngularFireDatabase,
      useClass: AngularFireDatabaseMocked
    },
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    MockDataService,
    ScenarioService
  ]
})
export class AngularFireMockedModule { }
