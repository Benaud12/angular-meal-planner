import { NgModule } from '@angular/core';
import {
  APP_BOOTSTRAP,
  APP_DECLARATIONS,
  APP_IMPORTS,
  APP_PROVIDERS,
  APP_SCHEMAS
} from './app.dependencies';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

APP_IMPORTS.push([
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  AngularFireDatabaseModule
]);

@NgModule({
  declarations: APP_DECLARATIONS,
  imports: APP_IMPORTS,
  providers: APP_PROVIDERS,
  bootstrap: APP_BOOTSTRAP,
  schemas: APP_SCHEMAS
})
export class AppModule { }
