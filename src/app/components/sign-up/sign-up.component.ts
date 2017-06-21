import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { ValidationHelper } from '../../helpers/validation.helper';

@Component({
  selector: 'mp-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;
  public submitError: boolean;

  @Input() public active: boolean;

  @Output('activationCallback') public activationCallback = new EventEmitter();

  @Output('successfulLogin') public successfulLogin = new EventEmitter();

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) {
      this.submitError = false;
  }

  public ngOnInit() {
    this.signUpForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', ValidationHelper.password()],
        passwordConfirm: ['', Validators.required],
        username: ['', Validators.required]
      },
      { validator: ValidationHelper.passwordMatch }
    );
  }

  public signUpAction(): void {
    if (this.isActive()) {
      this.processForm();
    } else {
      this.activationCallback.emit();
    }
  }

  public processForm() {
    if (this.signUpForm.valid) {
      this.submit();
    }
  }

  public submit(): void {
    this.authService.createUser(this.signUpForm.value)
      .then(user => {
        user.updateProfile({
          displayName: this.signUpForm.value['username'],
          photoURL: null
        })
        .then(() => { this.successfulLogin.emit(); })
        .catch(() => { this.successfulLogin.emit(); });
      })
      .catch(() => {
        this.submitError = true;
      });
  }

  private isActive(): boolean {
    return this.active === true;
  }
}
