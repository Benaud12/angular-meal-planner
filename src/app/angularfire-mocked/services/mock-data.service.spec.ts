import { TestBed, inject, async } from '@angular/core/testing';
import { Http, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MockDataService } from './mock-data.service';
import { ScenarioService } from './scenario.service';

describe('FirebaseAuthMocked service', () => {
  let mockedHttp: any,
    mockedScenario: any,
    mockedNotFoundResponse: any,
    mockedSuccessResponse: any;

  beforeEach(() => {
    mockedSuccessResponse = new Response(new ResponseOptions({
      body: {
        good: 'stuff'
      },
      status: 200
    }));
    mockedNotFoundResponse = new Response(new ResponseOptions({
      status: 404
    }));
    mockedHttp = jasmine.createSpyObj('mockedHttp', ['get']);
    mockedScenario = {
      name: 'mock-scenario',
      default: 'mock-default'
    };
    TestBed.configureTestingModule({
      providers: [
        MockDataService,
        {
          provide: Http,
          useFactory: () => { return mockedHttp; }
        },
        {
          provide: ScenarioService,
          useValue: mockedScenario
        }
      ]
    });
  });

  it('should create', async(inject([MockDataService],
    (service: MockDataService) => {
      // Assert
      expect(service).toBeTruthy();
    })));

  describe('getAuthData', () => {
    describe('scenario name set', () => {
      it('should return scenario specific auth data when available',
        async(inject([MockDataService], (service: MockDataService) => {
          // Arrange
          mockedHttp.get.and.returnValue(Observable.of(mockedSuccessResponse));

          // Act
          const promise = service.getAuthData();

          // Assert
          return promise.then(result => {
            return Promise.all([
              expect(mockedHttp.get.calls.allArgs()).toEqual([
                ['/mocks/mock-scenario/auth.json']
              ]),
              expect(result).toEqual({
                good: 'stuff'
              })
            ]);
          });
        })));

      it('should return default auth data when scenario data not found',
        async(inject([MockDataService], (service: MockDataService) => {
          // Arrange
          mockedHttp.get.and.returnValues(
            Observable.of(mockedNotFoundResponse),
            Observable.of(mockedSuccessResponse));

          // Act
          const promise = service.getAuthData();

          // Assert
          return promise.then(result => {
            return Promise.all([
              expect(mockedHttp.get.calls.allArgs()).toEqual([
                ['/mocks/mock-scenario/auth.json'],
                ['/mocks/mock-default/auth.json']
              ]),
              expect(result).toEqual({
                good: 'stuff'
              })
            ]);
          });
        })));

      it('should throw an error when no scenario/default data can be found',
        async(inject([MockDataService], (service: MockDataService) => {
          // Arrange
          mockedHttp.get.and.returnValues(
            Observable.of(mockedNotFoundResponse),
            Observable.of(mockedNotFoundResponse));

          // Act
          const promise = service.getAuthData();

          // Assert
          return promise
            .then(() => {
              console.error('Expected error to be thrown')
              return expect(true).toBe(false);
            })
            .catch(error => {
              return Promise.all([
                expect(mockedHttp.get.calls.allArgs()).toEqual([
                  ['/mocks/mock-scenario/auth.json'],
                  ['/mocks/mock-default/auth.json']
                ]),
                expect(error.message).toEqual('No auth mock data found')
              ]);
            });
        })));
    });

    describe('scenario name not set', () => {
      beforeEach(() => {
        delete(mockedScenario.name);
      });

      it('should return default auth data and not try to get scenario data',
        async(inject([MockDataService], (service: MockDataService) => {
          // Arrange
          mockedHttp.get.and.returnValue(Observable.of(mockedSuccessResponse));

          // Act
          const promise = service.getAuthData();

          // Assert
          return promise.then(result => {
            return Promise.all([
              expect(mockedHttp.get.calls.allArgs()).toEqual([
                ['/mocks/mock-default/auth.json']
              ]),
              expect(result).toEqual({
                good: 'stuff'
              })
            ]);
          });
        })));

      it('should throw an error when no default data can be found',
        async(inject([MockDataService], (service: MockDataService) => {
          // Arrange
          mockedHttp.get.and.returnValue(Observable.of(mockedNotFoundResponse));

          // Act
          const promise = service.getAuthData();

          // Assert
          return promise
            .then(() => {
              console.error('Expected error to be thrown')
              return expect(true).toBe(false);
            })
            .catch(error => {
              return Promise.all([
                expect(mockedHttp.get.calls.allArgs()).toEqual([
                  ['/mocks/mock-default/auth.json']
                ]),
                expect(error.message).toEqual('No auth mock data found')
              ]);
            });
        })));
    });
  });
});
