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
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent,
    fixture: ComponentFixture<LoginComponent>,
    mockAuthService: any;

  beforeEach(async(() => {
    mockAuthService = {
      login: jasmine.createSpy('login')
    };
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
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
    fixture = TestBed.createComponent(LoginComponent);
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
        password: ''
      };
      expect(component.loginForm.value).toEqual(expected);
    }));
  });

  describe('loginForm', () => {
    it('should be invalid initially', async(() => {
      // Assert
      expect(component.loginForm.valid).toBe(false);
    }));

    describe('validation', () => {
      beforeEach(()=> {
        component.loginForm.setValue({
          email: 'billy@email.com',
          password: 'this_is_good'
        });
      });

      it('should be valid with correct values', async(() => {
        // Assert
        expect(component.loginForm.valid).toBe(true);
      }));

      describe('email', () => {
        it('should be required', async(() => {
          // Act
          component.loginForm.controls['email'].setValue('');

          // Assert
          expect(component.loginForm.valid).toBe(false);
        }));
      });

      describe('password', () => {
        it('should be required', async(() => {
          // Act
          component.loginForm.controls['password'].setValue('');

          // Assert
          expect(component.loginForm.valid).toBe(false);
        }));

        it('should be at least 6 characters long', async(() => {
          // Act
          component.loginForm.controls['password'].setValue('baddy');

          // Assert
          expect(component.loginForm.valid).toBe(false);
        }));
      });
    });
  });

  describe('loginAction', () => {
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
        component.loginAction();

        // Assert
        expect(component.activationCallback.emit).toHaveBeenCalledWith();
      }));

      it('should not call the processForm function', async(() => {
        // Act
        component.loginAction();

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
        component.loginAction();

        // Assert
        expect(component.processForm).toHaveBeenCalledWith();
      }));

      it('should not call the activationCallback.emit function', async(() => {
        // Act
        component.loginAction();

        // Assert
        expect(component.activationCallback.emit).not.toHaveBeenCalled();
      }));
    });
  });

  describe('processForm', () => {
    describe('valid form', () => {
      it('should call submit', async(() => {
        // Arrange
        component.loginForm.setValue({
          email: 'billy@email.com',
          password: 'validdy'
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
        component.loginForm.setValue({
          email: 'billy@email.com',
          password: 'bad'
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
      component.loginForm.setValue({
        email: 'billy@email.com',
        password: 'validdy'
      });
    });

    it('should call login on the UserService correctly', fakeAsync(() => {
      // Arrange
      mockAuthService.login.and.returnValue(Promise.resolve());

      // Act
      component.submit();

      // Assert
      tick();
      expect(mockAuthService.login)
        .toHaveBeenCalledWith(component.loginForm.value);
    }));

    describe('failed authentication response', () => {
      it('should set submitError to true', fakeAsync(() => {
        // Arrange
        mockAuthService.login.and.returnValue(Promise.reject('error'));

        // Act
        component.submit();

        // Assert
        tick();
        expect(component.submitError).toBe(true);
      }));
    });
  });
});
