/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should have signUpActive set to false initially', () => {
    // Assert
    expect(component.signUpActive).toBe(false);
  });

  it('should have logInActive set to false initially', () => {
    // Assert
    expect(component.logInActive).toBe(false);
  });

  describe('startLogIn', () => {
    it('should set logInActive to true', () => {
      // Act
      component.startLogIn();

      // Assert
      expect(component.logInActive).toBe(true);
    });
  });

  describe('stopLogIn', () => {
    it('should set logInActive to false', () => {
      // Arrange
      component.logInActive = true;

      // Act
      component.stopLogIn();

      // Assert
      expect(component.logInActive).toBe(false);
    });
  });

  describe('startSignUp', () => {
    it('should set signUpActive to true', () => {
      // Act
      component.startSignUp();

      // Assert
      expect(component.signUpActive).toBe(true);
    });
  });

  describe('stopSignUp', () => {
    it('should set signUpActive to false', () => {
      // Arrange
      component.signUpActive = true;

      // Act
      component.stopSignUp();

      // Assert
      expect(component.signUpActive).toBe(false);
    });
  });

  describe('logInActivation', () => {
    it('should call startLogIn and stopSignUp functions', () => {
      // Arrange
      spyOn(component, 'startLogIn');
      spyOn(component, 'stopSignUp');

      // Act
      component.logInActivation();

      // Assert
      expect(component.startLogIn).toHaveBeenCalledWith();
      expect(component.stopSignUp).toHaveBeenCalledWith();
    });
  });

  describe('signUpActivation', () => {
    it('should call startSignUp and stopLogIn functions', () => {
      // Arrange
      spyOn(component, 'startSignUp');
      spyOn(component, 'stopLogIn');

      // Act
      component.signUpActivation();

      // Assert
      expect(component.startSignUp).toHaveBeenCalledWith();
      expect(component.stopLogIn).toHaveBeenCalledWith();
    });
  });
});
