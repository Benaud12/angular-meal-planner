import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ValidationHelper } from '../../helpers/validation.helper';

@Component({
  selector: 'mp-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  @Input() public active: boolean;

  @Output('activationCallback') public activationCallback = new EventEmitter();

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder) {
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
    this.userService.createUser(this.signUpForm.value)
      .then(deets => {
        console.log('created user: ', deets);
      })
      .catch(error => {
        console.log('Error creating user: ', error);
      });
  }

  private isActive(): boolean {
    return this.active === true;
  }
}
