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

import { AppComponent } from './app.component';
import { AuthRouteGuard } from './auth-route.guard';
import { AppRoutingModule } from './app-routing.module';
import {
  ActivatingInputComponent,
  HeaderComponent,
  LoginComponent,
  SignUpComponent } from './components';
import { LoginPage, WeekPage } from './pages';
import { AuthenticationService, DataService } from './services';


export const APP_DECLARATIONS: Array<Type<any> | any[]> = [
  ActivatingInputComponent,
  AppComponent,
  HeaderComponent,
  LoginComponent,
  LoginPage,
  SignUpComponent,
  WeekPage
]

export const APP_IMPORTS: Array<Type<any> | ModuleWithProviders | any[]> = [
  AppRoutingModule,
  BrowserModule,
  FormsModule,
  HttpModule,
  ReactiveFormsModule
];

export const APP_PROVIDERS: Provider[] = [
  AuthenticationService,
  AuthRouteGuard,
  DataService
]

export const APP_BOOTSTRAP: Array<Type<any> | any[]> = [
  AppComponent
];

export const APP_SCHEMAS: SchemaMetadata[] = [
  CUSTOM_ELEMENTS_SCHEMA
];
