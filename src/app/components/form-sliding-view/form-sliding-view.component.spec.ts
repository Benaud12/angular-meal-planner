/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormSlidingViewComponent } from './form-sliding-view.component';

describe('FormSlidingViewComponent', () => {
  let component: FormSlidingViewComponent;
  let fixture: ComponentFixture<FormSlidingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSlidingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSlidingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isActive', () => {
    it('should return false initially', () => {
      // Act
      let result = component.isActive();

      // Assert
      expect(result).toBe(false);
    });

    it('should return false if active property is false', () => {
      // Arrange
      component.active = false;

      // Act
      let result = component.isActive();

      // Assert
      expect(result).toBe(false);
    });

    it('should return true if active property is true', () => {
      // Arrange
      component.active = true;

      // Act
      let result = component.isActive();

      // Assert
      expect(result).toBe(true);
    });

    it('should return false if active property is undefined', () => {
      // Arrange
      component.active = undefined;

      // Act
      let result = component.isActive();

      // Assert
      expect(result).toBe(false);
    });
  });
});
