import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mp-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  public buttonText: string = 'Sign Up';

  public inputElements: Array<Object> = [
    {
      name: 'username',
      placeholder: 'username',
      type: 'text'
    },
    {
      name: 'email',
      placeholder: 'email',
      type: 'email'
    },
    {
      name: 'password',
      placeholder: 'password',
      type: 'password'
    },
    {
      name: 'password-confirm',
      placeholder: 'confirm password',
      type: 'password'
    }
  ];

  @Input() public active: boolean;

  @Output('activationCallback') public activationCallback = new EventEmitter();

  public signUpAction(): void {
    if (this.isActive()) {
      this.submit();
    } else {
      this.activationCallback.emit();
    }
  }

  public submit(): void {

  }

  private isActive(): boolean {
    return this.active === true;
  }
}
