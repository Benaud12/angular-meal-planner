import { TestBed, inject } from '@angular/core/testing';
import { ScenarioService } from './scenario.service';
import { Location } from '@angular/common';

describe('ScenarioService', () => {
  let mockedLocation: any;

  beforeEach(() => {
    mockedLocation = {
      path: jasmine.createSpy('path')
    };
    TestBed.configureTestingModule({
      providers: [
        ScenarioService,
        {
          provide: Location,
          useValue: mockedLocation
        }
      ]
    });
  });

  it('should create', inject([ScenarioService], (service: ScenarioService) => {
    // Assert
    expect(service).toBeTruthy();
  }));

  describe('name', () => {
    it('should return undefined when no query string in path',
      inject([ScenarioService], (service: ScenarioService) => {
        // Arrange
        mockedLocation.path.and.returnValue('/no/query/string');

        // Act
        const result = service.name;

        // Assert
        expect(mockedLocation.path).toHaveBeenCalledWith();
        expect(result).toEqual(undefined);
      }));

    it('should return undefined when no scenario in query string',
      inject([ScenarioService], (service: ScenarioService) => {
        // Arrange
        mockedLocation.path.and.returnValue('/something?foo=bar&bad=man');

        // Act
        const result = service.name;

        // Assert
        expect(mockedLocation.path).toHaveBeenCalledWith();
        expect(result).toEqual(undefined);
      }));

    [
      ['/something?scenario=foo', 'foo'],
      ['/something?scenario=bees&dog=poo', 'bees'],
      ['/something?bad=man&scenario=bark', 'bark']
    ].forEach((testData, index) => {
      it(`should return the scenario given in query string #${index + 1}`,
        inject([ScenarioService], (service: ScenarioService) => {
          // Arrange
          const path = testData[0];
          mockedLocation.path.and.returnValue(path);

          // Act
          const result = service.name;

          // Assert
          const expected = testData[1];
          expect(mockedLocation.path).toHaveBeenCalledWith();
          expect(result).toEqual(expected);
        }));
    });
  });

  describe('default', () => {
    it('should return the default scenario', inject([ScenarioService],
      (service: ScenarioService) => {
        // Act
        const result = service.default;

        // Assert
        expect(result).toEqual('_default');
      }));
  });
});
