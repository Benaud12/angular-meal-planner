import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './services';

@Injectable()
export class AuthRouteGuard implements CanActivate {

  constructor(private authService: AuthenticationService) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.getAuthState().map(user => user != null);
  }
}
