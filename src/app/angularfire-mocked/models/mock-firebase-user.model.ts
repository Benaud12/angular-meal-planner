import { MockFirebaseUserOverwrite } from '../interfaces';
import * as firebase from 'firebase/app';

export class MockFirebaseUser implements firebase.User {

  public displayName: string | null;
  public email: string | null;
  public photoURL: string | null;
  public providerId: string;
  public uid: string;
  public emailVerified: boolean;
  public isAnonymous: boolean;
  public providerData: ( firebase.UserInfo | null ) [] = [];
  public refreshToken: string;

  constructor(user: MockFirebaseUserOverwrite = {}) {
    this.displayName = user.displayName || null,
    this.email = user.email || 'mock-user@email.com',
    this.photoURL = user.photoURL || null,
    this.providerId = user.providerId || 'provider-id',
    this.uid = user.uid || 'user-id',
    this.emailVerified = user.emailVerified || false,
    this.isAnonymous = user.isAnonymous || false,
    this.refreshToken = user.refreshToken || 'mock-refresh-token'
  }

  public delete() { return Promise.resolve() }
  public getToken() { return Promise.resolve() }
  public link() { return Promise.resolve() }
  public linkWithCredential() { return Promise.resolve() }
  public linkWithPopup() { return Promise.resolve() }
  public linkWithRedirect() { return Promise.resolve() }
  public reauthenticate() { return Promise.resolve() }
  public reauthenticateWithCredential() { return Promise.resolve() }
  public reauthenticateWithPopup() { return Promise.resolve() }
  public reauthenticateWithRedirect() { return Promise.resolve() }
  public reload() { return Promise.resolve() }
  public sendEmailVerification() { return Promise.resolve() }
  public toJSON() { return 'mock-json' }
  public unlink() { return Promise.resolve() }
  public updateEmail() { return Promise.resolve() }
  public updatePassword() { return Promise.resolve() }
  public updateProfile() { return Promise.resolve() }
}