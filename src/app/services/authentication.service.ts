import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserAuth } from '../interfaces';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) {
  }

  createUser(credentials: UserAuth): firebase.Promise<firebase.User> {
    return this.angularFireAuth.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  getAuthState(): Observable<firebase.User> {
    return this.angularFireAuth.authState;
  }

  login(credentials: UserAuth): firebase.Promise<firebase.User> {
    return this.angularFireAuth.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password);
  }
}
