import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mp-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

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
