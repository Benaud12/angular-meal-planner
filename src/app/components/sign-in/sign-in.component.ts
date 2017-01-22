import { Component } from '@angular/core';

@Component({
  selector: 'mp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public signUpActive: boolean = false;

  public logInActive: boolean = false;

  public startLogIn(): void {
    this.logInActive = true;
  }

  public stopLogIn(): void {
    this.logInActive = false;
  }

  public startSignUp(): void {
    this.signUpActive = true;
  }

  public stopSignUp(): void {
    this.signUpActive = false;
  }

  public logInActivation(): void {
    this.stopSignUp();
    this.startLogIn();
  }

  public signUpActivation(): void {
    this.stopLogIn();
    this.startSignUp();
  }
}
