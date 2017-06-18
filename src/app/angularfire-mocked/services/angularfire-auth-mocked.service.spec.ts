import {
  TestBed,
  inject,
  async,
  fakeAsync,
  tick } from '@angular/core/testing';
import { AngularFireAuthMocked } from './angularfire-auth-mocked.service';
import { MockDataService } from './mock-data.service';
import { MockFirebaseUser } from '../models/mock-firebase-user.model';

describe('AngularFireAuthMocked service', () => {
  let mockedDataService: any;

  beforeEach(() => {
    mockedDataService = {
      getAuthData: jasmine.createSpy('getAuthData')
        .and.returnValue(Promise.resolve('data'))
    };
    TestBed.configureTestingModule({
      providers: [
        AngularFireAuthMocked,
        {
          provide: MockDataService,
          useValue: mockedDataService
        }
      ]
    });
  });

  describe('contructor', () => {
    it('should create', async(inject([AngularFireAuthMocked],
      (service: AngularFireAuthMocked) => {
        // Assert
        expect(service).toBeTruthy();
      })));
  });

  describe('auth', () => {
    it('should be this service', async(
      inject([AngularFireAuthMocked], (service: AngularFireAuthMocked) => {
        // Assert
        expect(service.auth).toBe(service);
      })));
  });

  describe('createUserWithEmailAndPassword', () => {
    describe('mocked success', () => {
      beforeEach(() => {
        const mockData = {
          createUserWithEmailAndPassword: {
            successful: true,
            user: {
              displayName: 'Jerry',
              email: 'jerry@thecat.com'
            }
          }
        };
        mockedDataService.getAuthData
          .and.returnValue(Promise.resolve(mockData));
      });

      it('should set the current user from mock data and return a promise ' +
        'resolving with that user', async(inject([AngularFireAuthMocked],
        (service: AngularFireAuthMocked) => {
          // Arrange
          service.currentUser = null;

          // Act
          const promise = service.createUserWithEmailAndPassword();

          // Assert
          const expected = new MockFirebaseUser({
            displayName: 'Jerry',
            email: 'jerry@thecat.com'
          });
          return promise.then(result => {
            return Promise.all([
              expect(mockedDataService.getAuthData).toHaveBeenCalledWith(),
              expect(service.currentUser).toEqual(expected),
              expect(result).toEqual(expected)
            ]);
          });
        })));
    });

    describe('mocked failure', () => {
      beforeEach(() => {
        const mockData = {
          createUserWithEmailAndPassword: {
            successful: false,
            errorCode: 'auth/email-already-in-use'
          }
        };
        mockedDataService.getAuthData
          .and.returnValue(Promise.resolve(mockData));
      });

      it('should throw an error with mocked errorCode', async(
        inject([AngularFireAuthMocked], (service: AngularFireAuthMocked) => {
          // Act
          const promise = service.createUserWithEmailAndPassword();

          // Assert
          return promise
            .then(() => {
              console.error('Expected error to be thrown')
              return expect(true).toBe(false);
            })
            .catch(error => {
              return Promise.all([
                expect(mockedDataService.getAuthData).toHaveBeenCalledWith(),
                expect(error.message).toEqual('auth/email-already-in-use')
              ]);
            });
        })));
    });

    describe('mock data missing', () => {
      beforeEach(() => {
        const mockData = {
          somethingElse: 'stuff'
        };
        mockedDataService.getAuthData
          .and.returnValue(Promise.resolve(mockData));
      });

      it('should throw expected error', async(
        inject([AngularFireAuthMocked], (service: AngularFireAuthMocked) => {
          // Act
          const promise = service.createUserWithEmailAndPassword();

          // Assert
          return promise
            .then(() => {
              console.error('Expected error to be thrown')
              return expect(true).toBe(false);
            })
            .catch(error => {
              return Promise.all([
                expect(mockedDataService.getAuthData).toHaveBeenCalledWith(),
                expect(error.message).toEqual('Mock data missing for ' +
                  'AngularFireAuthMocked.createUserWithEmailAndPassword')
              ]);
            });
        })));
    });
  });

  describe('authState observable', () => {
    describe('currentUser has been set', () => {
      it('should resolve with the currentUser', async(
        inject([AngularFireAuthMocked], (service: AngularFireAuthMocked) => {
          // Arrange
          service.currentUser = new MockFirebaseUser({
            displayName: 'RiRi Mac'
          });

          // Act
          const result = service.authState

          // Assert
          return result.subscribe(user => {
            return expect(user.displayName).toEqual('RiRi Mac');
          });
        })));
    });

    describe('currentUser not set but is available in mock data', () => {
      beforeEach(() => {
        const mockData = {
          currentUser: {
            displayName: 'Gail'
          }
        };
        mockedDataService.getAuthData
          .and.returnValue(Promise.resolve(mockData));
      });

      it('should resolve with the currentUser from mock data', async(
        inject([AngularFireAuthMocked], (service: AngularFireAuthMocked) => {
          // Act
          const result = service.authState

          // Assert
          return result.subscribe(user => {
            return Promise.all([
              expect(user.displayName).toEqual('Gail'),
              expect(mockedDataService.getAuthData).toHaveBeenCalledWith()
            ]);
          });
        })));
    });

    describe('mock data for currentUser not available', () => {
      beforeEach(() => {
        const mockData = {
          otherStuff: {
            something: 'else'
          }
        };
        mockedDataService.getAuthData
          .and.returnValue(Promise.resolve(mockData));
      });

      it('should resolve with undefined', async(
        inject([AngularFireAuthMocked], (service: AngularFireAuthMocked) => {
          // Act
          const result = service.authState

          // Assert
          return result.subscribe(user => {
            return Promise.all([
              expect(user).toBeUndefined(),
              expect(mockedDataService.getAuthData).toHaveBeenCalledWith()
            ]);
          });
        })));
    });
  });
});
