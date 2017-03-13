import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { NewUserDatabase } from '../interfaces';

@Injectable()
export class DataService {

  constructor(private database: AngularFireDatabase) {
  }

  createUserEntry(user: NewUserDatabase): firebase.Promise<void> {
    const userEntry = {};
    userEntry[user.uid] = {
      username: user.username
    };
    return this.database.object('/user').update(userEntry);
  }
}
