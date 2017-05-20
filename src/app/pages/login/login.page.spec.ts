/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
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

  it('should have loginActive set to false initially', () => {
    // Assert
    expect(component.loginActive).toBe(false);
  });

  describe('startLogin', () => {
    it('should set loginActive to true', () => {
      // Act
      component.startLogin();

      // Assert
      expect(component.loginActive).toBe(true);
    });
  });

  describe('stopLogin', () => {
    it('should set loginActive to false', () => {
      // Arrange
      component.loginActive = true;

      // Act
      component.stopLogin();

      // Assert
      expect(component.loginActive).toBe(false);
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

  describe('loginActivation', () => {
    it('should call startLogin and stopSignUp functions', () => {
      // Arrange
      spyOn(component, 'startLogin');
      spyOn(component, 'stopSignUp');

      // Act
      component.loginActivation();

      // Assert
      expect(component.startLogin).toHaveBeenCalledWith();
      expect(component.stopSignUp).toHaveBeenCalledWith();
    });
  });

  describe('signUpActivation', () => {
    it('should call startSignUp and stopLogin functions', () => {
      // Arrange
      spyOn(component, 'startSignUp');
      spyOn(component, 'stopLogin');

      // Act
      component.signUpActivation();

      // Assert
      expect(component.startSignUp).toHaveBeenCalledWith();
      expect(component.stopLogin).toHaveBeenCalledWith();
    });
  });
});
