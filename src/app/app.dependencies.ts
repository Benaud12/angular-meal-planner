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
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
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


export const APP_DECLARATIONS: Array<Type<any> | any[]> = [
  AppComponent,
  HeaderComponent,
  LoginComponent,
  LoginPage,
  SignUpComponent,
  ActivatingInputComponent
]

export const APP_IMPORTS: Array<Type<any> | ModuleWithProviders | any[]> = [
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  AngularFireDatabaseModule,
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
