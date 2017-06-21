import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './services';

@Injectable()
export class AuthRouteGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.getAuthState().map(user => {
        if (user) {
          return true;
        }
        this.router.navigateByUrl('/login');
        return false;
      });
    }
}
