import { Injectable } from '@angular/core';
import { AuthenticationService, DataService } from './';
import { FirebaseAuthState } from 'angularfire2';
import { NewUser, NewUserDatabase } from '../interfaces';

@Injectable()
export class UserService {

  constructor(
    private authService: AuthenticationService,
    private dataService: DataService) {
  }

  createUser(newUser: NewUser): firebase.Promise<FirebaseAuthState> {
    return this.authService.createUser(newUser)
      .then(createdUser => {
        const userData = {
          uid: createdUser.uid,
          username: newUser.username
        };
        return this.createUserDataEntry(userData);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  createUserDataEntry(userData: NewUserDatabase): firebase.Promise<any> {
    return this.dataService.createUserEntry(userData)
      .then(() => {
        return Promise.resolve({
          uid: userData.uid,
          dataEntryCreated: true
        });
      })
      .catch(() => {
        return Promise.resolve({
          uid: userData.uid,
          dataEntryCreated: false
        });
      });
  }
}
