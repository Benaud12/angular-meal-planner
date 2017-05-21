import { Injectable } from '@angular/core';
import { AuthenticationService, DataService } from './';
import {
  NewUser,
  NewUserDatabase,
  UserAuth,
  UserUpdateDetails } from '../interfaces';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  constructor(
    private authService: AuthenticationService,
    private dataService: DataService) {
  }

  createUser(newUser: NewUser): firebase.Promise<firebase.User> {
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

  login(user: UserAuth): firebase.Promise<firebase.User> {
    return this.authService.login(user);
  }

  updateProfile(user: firebase.User,
    details: UserUpdateDetails): firebase.Promise<any> {
      return user.updateProfile(details)
        .then(() => {
          return Promise.resolve({
            uid: user.uid,
            profileUpdated: true
          });
        })
        .catch(() => {
          return Promise.resolve({
            uid: user.uid,
            profileUpdated: false
          });
        });
    }
}
