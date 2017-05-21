import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatingInputComponent } from './activating-input.component';

describe('ActivatingInputComponent', () => {
  let component: ActivatingInputComponent;
  let fixture: ComponentFixture<ActivatingInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivatingInputComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivatingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should have inputType as text by default', () => {
    // Assert
    expect(component.inputType).toEqual('text');
  });

  describe('writeValue', () => {
    it('should set the inputFormControl value', () => {
      // Arrange
      component.inputFormControl.setValue('bees');

      // Act
      component.writeValue('dogs');

      // Assert
      expect(component.inputFormControl.value).toEqual('dogs');
    });

    it('should not change the inputFormControl value if new value is undefined',
      () => {
        // Arrange
        component.inputFormControl.setValue('bees');

        // Act
        component.writeValue(undefined);

        // Assert
        expect(component.inputFormControl.value).toEqual('bees');
      });
  });
});
