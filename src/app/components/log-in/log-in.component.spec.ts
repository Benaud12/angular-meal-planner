/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LogInComponent } from './log-in.component';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should have the correct buttonText', () => {
    // Assert
    expect(component.buttonText).toEqual('Log In');
  });

  it('should have the correct inputElements', () => {
    // Assert
    let expected = [
      {
        name: 'username',
        placeholder: 'username',
        type: 'text'
      },
      {
        name: 'password',
        placeholder: 'password',
        type: 'password'
      }
    ];
    expect(component.inputElements).toEqual(expected);
  });

  describe('logInAction', () => {
    beforeEach(() => {
      spyOn(component.activationCallback, 'emit');
      spyOn(component, 'submit');
    });

    describe('active is false', () => {
      beforeEach(() => {
        component.active = false;
      });

      it('should call the activationCallback.emit function', () => {
        // Act
        component.logInAction();

        // Assert
        expect(component.activationCallback.emit).toHaveBeenCalledWith();
      });

      it('should not call the submit function', () => {
        // Act
        component.logInAction();

        // Assert
        expect(component.submit).not.toHaveBeenCalled();
      });
    });

    describe('active is true', () => {
      beforeEach(() => {
        component.active = true;
      });

      it('should call the submit function', () => {
        // Act
        component.logInAction();

        // Assert
        expect(component.submit).toHaveBeenCalledWith();
      });

      it('should not call the activationCallback.emit function', () => {
        // Act
        component.logInAction();

        // Assert
        expect(component.activationCallback.emit).not.toHaveBeenCalled();
      });
    });
  });
});
