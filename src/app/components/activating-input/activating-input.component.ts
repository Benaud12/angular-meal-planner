import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mp-activating-input',
  templateUrl: './activating-input.component.html',
  styleUrls: ['./activating-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ActivatingInputComponent),
      multi: true
    }
  ]
})
export class ActivatingInputComponent implements ControlValueAccessor {

  @Input()
  public active: boolean;

  @Input()
  public inputName: string;

  @Input()
  public inputPlaceholder: string;

  @Input()
  public inputType: string = 'text'

  @Input()
  public inputFormControl: FormControl = new FormControl();

  constructor() { }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.inputFormControl.setValue(value);
    }
  }

  registerOnChange() {}

  registerOnTouched() {}
}
