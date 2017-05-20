import { BrowserModule } from '@angular/platform-browser';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  Provider,
  Type,
  ModuleWithProviders,
  SchemaMetadata } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AuthRouteGuard } from './auth-route.guard';
import { AppRoutingModule } from './app-routing.module';

import {
  ActivatingInputComponent,
  HeaderComponent,
  LoginComponent,
  SignUpComponent } from './components';
import { LoginPage } from './pages';

import { AuthenticationService, DataService, UserService } from './services';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

const firebaseConfig = {
  apiKey: environment.firebaseConfig.apiKey,
  authDomain: environment.firebaseConfig.authDomain,
  databaseURL: environment.firebaseConfig.databaseURL,
  storageBucket: environment.firebaseConfig.storageBucket,
  messagingSenderId: environment.firebaseConfig.messagingSenderId
};

export const APP_DECLARATIONS: Array<Type<any> | any[]> = [
  AppComponent,
  HeaderComponent,
  LoginComponent,
  LoginPage,
  SignUpComponent,
  ActivatingInputComponent
]

export const APP_IMPORTS: Array<Type<any> | ModuleWithProviders | any[]> = [
  AngularFireModule.initializeApp(
    firebaseConfig,
    {
      // method: AuthMethods.Popup,
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }
  ),
  AppRoutingModule,
  BrowserModule,
  FormsModule,
  HttpModule,
  ReactiveFormsModule
];

export const APP_PROVIDERS: Provider[] = [
  AuthenticationService,
  AuthRouteGuard,
  DataService,
  UserService
]

export const APP_BOOTSTRAP: Array<Type<any> | any[]> = [
  AppComponent
];

export const APP_SCHEMAS: SchemaMetadata[] = [
  CUSTOM_ELEMENTS_SCHEMA
];
