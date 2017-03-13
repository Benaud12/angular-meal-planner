import { Injectable } from '@angular/core';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { NewUserAuth } from '../interfaces';

@Injectable()
export class AuthenticationService {

  constructor(private backendAuth: AngularFireAuth) {
  }

  createUser(credentials: NewUserAuth): firebase.Promise<FirebaseAuthState> {
    return this.backendAuth.createUser(credentials);
  }

  getAuth(): AngularFireAuth {
    return this.backendAuth;
  }
}
