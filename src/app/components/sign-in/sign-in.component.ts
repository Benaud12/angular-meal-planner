import { Component } from '@angular/core';

@Component({
  selector: 'mp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public signUpActive: boolean = false;

  public loginActive: boolean = false;

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
}
