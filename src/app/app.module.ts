import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { environment } from '../environments/environment';

import { AuthenticationService, DataService, UserService } from './services';

import { AppComponent } from './app.component';
import { AuthRouteGuard } from './auth-route.guard';
import { HeaderComponent,
         LoginComponent,
         SignInComponent,
         SignUpComponent } from './components';
import { ActivatingInputComponent } from './components/activating-input/activating-input.component';

const firebaseConfig = {
  apiKey: environment.firebaseConfig.apiKey,
  authDomain: environment.firebaseConfig.authDomain,
  databaseURL: environment.firebaseConfig.databaseURL,
  storageBucket: environment.firebaseConfig.storageBucket,
  messagingSenderId: environment.firebaseConfig.messagingSenderId
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    ActivatingInputComponent,
  ],
  imports: [
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
  ],
  providers: [
    AuthenticationService,
    DataService,
    UserService
  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
