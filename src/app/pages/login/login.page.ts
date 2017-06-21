import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mp-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  public signUpActive: boolean = false;

  public loginActive: boolean = false;

  constructor(private router: Router) {

  }

  public startLogin(): void {
    this.loginActive = true;
  }

  public stopLogin(): void {
    this.loginActive = false;
  }

  public startSignUp(): void {
    this.signUpActive = true;
  }

  public stopSignUp(): void {
    this.signUpActive = false;
  }

  public loginActivation(): void {
    this.stopSignUp();
    this.startLogin();
  }

  public signUpActivation(): void {
    this.stopLogin();
    this.startSignUp();
  }

  public successfulLogin(): void {
    this.router.navigate(['/week']);
  }
}
