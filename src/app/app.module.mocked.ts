import { NgModule } from '@angular/core';
import {
  APP_BOOTSTRAP,
  APP_DECLARATIONS,
  APP_IMPORTS,
  APP_PROVIDERS,
  APP_SCHEMAS
} from './app.dependencies';

import { AngularFireMockedModule } from './angularfire-mocked';

APP_IMPORTS.push(AngularFireMockedModule);

@NgModule({
  declarations: APP_DECLARATIONS,
  imports: APP_IMPORTS,
  providers: APP_PROVIDERS,
  bootstrap: APP_BOOTSTRAP,
  schemas: APP_SCHEMAS
})
export class MockedAppModule { }
