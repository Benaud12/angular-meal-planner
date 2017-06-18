import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { MockFirebaseUser } from '../models/mock-firebase-user.model';
import { Observable, Observer } from 'rxjs/Rx';
import { observeOn } from 'rxjs/operator/observeOn';

@Injectable()
export class AngularFireAuthMocked {

  public auth: any = this;
  public authState: Observable<MockFirebaseUser>;
  public currentUser: MockFirebaseUser;

  constructor(private mockData: MockDataService) {
    this.authState =
      Observable.create((observer: Observer<MockFirebaseUser>) => {
        if (this.currentUser) {
          observer.next(this.currentUser);
        }
        this.mockData.getAuthData().then(data => {
          if (typeof data.currentUser !== 'undefined') {
            this.currentUser = new MockFirebaseUser(data.currentUser);
            observer.next(this.currentUser);
          }
          observer.next(this.currentUser);
          observer.complete();
        });
      });
  }

  public createUserWithEmailAndPassword(): Promise<MockFirebaseUser> {
    return this.mockData.getAuthData()
      .then(data => {
        if (typeof data.createUserWithEmailAndPassword === 'undefined') {
          throw new Error('Mock data missing for ' +
            'AngularFireAuthMocked.createUserWithEmailAndPassword');
        } else if (data.createUserWithEmailAndPassword.successful) {
          this.currentUser =
            new MockFirebaseUser(data.createUserWithEmailAndPassword.user);
          return this.currentUser;
        }
        throw new Error(data.createUserWithEmailAndPassword.errorCode);
      });
  }

  public signInWithEmailAndPassword() {

  }
}
