import { AbstractControl, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

export class ValidationHelper {
  static password(): ValidatorFn {
    return Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ]);
  }

  static passwordMatch(form: FormGroup): {[key: string]: boolean} {
    return form.get('password').value === form.get('passwordConfirm').value
      ? null : { 'mismatch': true }
  }
}
