import { Injectable } from '@angular/core';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { UserAuth } from '../interfaces';

@Injectable()
export class AuthenticationService {

  constructor(private backendAuth: AngularFireAuth) {
  }

  createUser(credentials: UserAuth): firebase.Promise<FirebaseAuthState> {
    return this.backendAuth.createUser(credentials);
  }

  getAuth(): AngularFireAuth {
    return this.backendAuth;
  }

  login(credentials: UserAuth): firebase.Promise<FirebaseAuthState> {
    return this.backendAuth.login(credentials);
  }
}
