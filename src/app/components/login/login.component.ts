import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationHelper } from '../../helpers/validation.helper';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'mp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitError: boolean;

  @Input() public active: boolean;

  @Output('activationCallback') public activationCallback = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) {
      this.submitError = false;
  }

  public ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', ValidationHelper.password()]
    });
  }

  public loginAction(): void {
    if (this.isActive()) {
      this.processForm();
    } else {
      this.activationCallback.emit();
    }
  }

  public processForm(): void {
    if (this.loginForm.valid) {
      this.submit();
    }
  }

  public submit(): void {
    this.authService.login(this.loginForm.value)
      .catch(() => {
        this.submitError = true;
      });
  }

  private isActive(): boolean {
    return this.active === true;
  }
}
