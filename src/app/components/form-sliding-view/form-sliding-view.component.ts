import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mp-form-sliding-view',
  templateUrl: './form-sliding-view.component.html',
  styleUrls: ['./form-sliding-view.component.scss']
})
export class FormSlidingViewComponent {

  @Input() public active: boolean;

  @Input() public inputElements: Array<Object>;

  @Input() public buttonText: string;

  @Input() public buttonColor: string;

  @Output('buttonClickCallback') public buttonCallback = new EventEmitter();

  public isActive(): boolean {
    return this.active === true;
  }
}
