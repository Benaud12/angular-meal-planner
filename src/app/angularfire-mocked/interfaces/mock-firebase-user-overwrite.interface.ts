import * as firebase from 'firebase/app';

export interface MockFirebaseUserOverwrite {
  displayName? : string | null ;
  email? : string | null ;
  photoURL? : string | null ;
  providerId? : string ;
  uid? : string ;
  emailVerified? : boolean ;
  isAnonymous? : boolean ;
  refreshToken? : string ;
}
