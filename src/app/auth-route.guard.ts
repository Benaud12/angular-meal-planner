import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AngularFire } from 'angularfire2';
import { AuthenticationService } from './services';

@Injectable()
export class AuthRouteGuard implements CanActivate {

  constructor(private auth: AuthenticationService) {
  }

  canActivate(): Observable<boolean> {
    return this.auth.getAuth().map(auth => auth != null);
  }
}
