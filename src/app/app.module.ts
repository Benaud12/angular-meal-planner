import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule, AuthMethods } from 'angularfire2';
import { environment } from '../environments/environment';

import { AuthenticationService, DataService, UserService } from './services';

import { AppComponent } from './app.component';
import { HeaderComponent,
         LogInComponent,
         SignInComponent,
         SignUpComponent } from './components';

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
    LogInComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    AngularFireModule.initializeApp(
      firebaseConfig,
      {
        // method: AuthMethods.Popup,
        method: AuthMethods.Redirect
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
