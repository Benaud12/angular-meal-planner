import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mp-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

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
