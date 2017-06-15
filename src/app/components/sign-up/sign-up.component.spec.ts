/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AuthenticationService } from '../../services';
import { SignUpComponent } from './sign-up.component';
import { ValidationHelper } from '../../helpers/validation.helper';


describe('SignUpComponent', () => {
  let component: SignUpComponent,
    fixture: ComponentFixture<SignUpComponent>,
    mockAuthService: any,
    mockUser: any;

  beforeEach(async(() => {
    mockAuthService = {
      createUser: jasmine.createSpy('createUser')
    }
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [{
        provide: AuthenticationService,
        useValue: mockAuthService
      }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    // Assert
    expect(component).toBeTruthy();
  }));

  it('should have submitError set to false by default', async(() => {
    // Assert
    expect(component.submitError).toBe(false);
  }));

  describe('ngOnInit', () => {
    it('should build the form correctly', async(() => {
      // Assert
      const expected = {
        email: '',
        password: '',
        passwordConfirm: '',
        username: ''
      };
      expect(component.signUpForm.value).toEqual(expected);
    }));
  });

  describe('signUpForm', () => {
    it('should be invalid initially', async(() => {
      // Assert
      expect(component.signUpForm.valid).toBe(false);
    }));

    describe('validation', () => {
      beforeEach(()=> {
        component.signUpForm.setValue({
          email: 'mick@email.com',
          password: 'valid_p',
          passwordConfirm: 'valid_p',
          username: 'Micky'
        });
      });

      it('should be valid with correct values', async(() => {
        // Assert
        expect(component.signUpForm.valid).toBe(true);
      }));

      describe('email', () => {
        it('should be required', async(() => {
          // Act
          component.signUpForm.controls['email'].setValue('');

          // Assert
          expect(component.signUpForm.valid).toBe(false);
        }));
      });

      describe('password', () => {
        it('should be required', async(() => {
          // Act
          component.signUpForm.controls['password'].setValue('');

          // Assert
          expect(component.signUpForm.valid).toBe(false);
        }));

        it('should be at least 6 characters long', async(() => {
          // Act
          component.signUpForm.controls['password'].setValue('baddy');

          // Assert
          expect(component.signUpForm.valid).toBe(false);
        }));
      });

      describe('passwordConfirm', () => {
        it('should be required', async(() => {
          // Act
          component.signUpForm.controls['passwordConfirm'].setValue('');

          // Assert
          expect(component.signUpForm.valid).toBe(false);
        }));

        it('should match the password', async(() => {
          // Act
          component.signUpForm.controls['password'].setValue('a_password');
          component.signUpForm.controls['passwordConfirm'].setValue('differs');

          // Assert
          expect(component.signUpForm.valid).toBe(false);
        }));
      });

      describe('username', () => {
        it('should be required', async(() => {
          // Act
          component.signUpForm.controls['username'].setValue('');

          // Assert
          expect(component.signUpForm.valid).toBe(false);
        }));
      });
    });
  });

  describe('signUpAction', () => {
    beforeEach(() => {
      spyOn(component.activationCallback, 'emit');
      spyOn(component, 'processForm');
    });

    describe('active is false', () => {
      beforeEach(() => {
        component.active = false;
      });

      it('should call the activationCallback.emit function', async(() => {
        // Act
        component.signUpAction();

        // Assert
        expect(component.activationCallback.emit).toHaveBeenCalledWith();
      }));

      it('should not call the processForm function', async(() => {
        // Act
        component.signUpAction();

        // Assert
        expect(component.processForm).not.toHaveBeenCalled();
      }));
    });

    describe('active is true', () => {
      beforeEach(() => {
        component.active = true;
      });

      it('should call the processForm function', async(() => {
        // Act
        component.signUpAction();

        // Assert
        expect(component.processForm).toHaveBeenCalledWith();
      }));

      it('should not call the activationCallback.emit function', async(() => {
        // Act
        component.signUpAction();

        // Assert
        expect(component.activationCallback.emit).not.toHaveBeenCalled();
      }));
    });
  });

  describe('processForm', () => {
    describe('valid form', () => {
      it('should call submit', async(() => {
        // Arrange
        component.signUpForm.setValue({
          email: 'mick@email.com',
          password: 'valid_p',
          passwordConfirm: 'valid_p',
          username: 'Micky'
        });
        spyOn(component, 'submit');

        // Act
        component.processForm();

        // Assert
        expect(component.submit).toHaveBeenCalledWith();
      }));
    });

    describe('invalid form', () => {
      it('should not call submit', async(() => {
        // Arrange
        component.signUpForm.setValue({
          email: 'mick@email.com',
          password: 'valid_p',
          passwordConfirm: 'different',
          username: 'Micky'
        });
        spyOn(component, 'submit');

        // Act
        component.processForm();

        // Assert
        expect(component.submit).not.toHaveBeenCalled();
      }));
    });
  });

  describe('submit', () => {
    beforeEach(() => {
      component.signUpForm.setValue({
        email: 'mick@email.com',
        password: 'valid_p',
        passwordConfirm: 'valid_p',
        username: 'Micky'
      });
      mockUser = {
        updateProfile: jasmine.createSpy('updateProfile')
      };
    });

    it('should call createUser on the AuthenticationService correctly',
      async(() => {
        // Arrange
        mockUser.updateProfile.and.returnValue(Promise.resolve('done'));
        mockAuthService.createUser.and.returnValue(Promise.resolve(mockUser));

        // Act
        component.submit();

        // Assert
        expect(mockAuthService.createUser)
          .toHaveBeenCalledWith(component.signUpForm.value);
      }));

    describe('successful authentication response', () => {
      beforeEach(() => {
        mockAuthService.createUser.and.returnValue(Promise.resolve(mockUser));
      });

      it('should call updateProfile on the returned object correctly',
        fakeAsync(() => {
          // Arrange
          mockUser.updateProfile.and.returnValue(Promise.resolve('done'));

          // Act
          component.submit();

          // Assert
          const expected = {
            displayName: component.signUpForm.value['username'],
            photoURL: null
          };
          tick();
          expect(mockUser.updateProfile).toHaveBeenCalledWith(expected);
        }));

      describe('failed updateProfile response', () => {
        it('should not throw an error', async(() => {
          // Arrange
          mockUser.updateProfile.and.returnValue(Promise.reject('error'));

          // Act + Assert
          expect(() => { component.submit(); }).not.toThrowError();
        }));
      });
    });

    describe('failed authentication response', () => {
      beforeEach(() => {
        mockAuthService.createUser.and.returnValue(Promise.reject('shit!'));
      });

      it('should set submitError property to true', fakeAsync(() => {
        // Act
        component.submit();

        // Assert
        tick();
        expect(component.submitError).toBe(true);
      }));
    });
  });
});
