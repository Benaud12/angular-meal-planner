import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mp-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  public buttonText: string = 'Log In';

  public inputElements: Array<Object> = [
    {
      name: 'username',
      placeholder: 'username',
      type: 'text'
    },
    {
      name: 'password',
      placeholder: 'password',
      type: 'password'
    }
  ];

  @Input() public active: boolean;

  @Output('activationCallback') public activationCallback = new EventEmitter();

  public logInAction(): void {
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
