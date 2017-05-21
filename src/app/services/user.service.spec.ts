import { async, fakeAsync, TestBed, inject, tick } from '@angular/core/testing';
import { AuthenticationService, DataService } from './';
import { UserService } from './user.service';
import { UserUpdateDetails } from '../interfaces';
import * as firebase from 'firebase/app';

describe('UserService', () => {
  let MockAuthService: any,
    MockDataService: any,
    mockFirebaseUser: firebase.User,
    newUser: any,
    createdUser: any,
    userData: any,
    userDeets: UserUpdateDetails;

  beforeEach(() => {
    MockAuthService = {
      createUser: jasmine.createSpy('createUser'),
      login: jasmine.createSpy('login')
    };
    MockDataService = {
      createUserEntry: jasmine.createSpy('createUserEntry')
    };
    mockFirebaseUser = {
      displayName: null,
      email: 'mock-user@email.com',
      photoURL: null,
      providerId: 'provider-id',
      uid: 'user-id',
      delete: () => { return Promise.resolve() },
      emailVerified: true,
      getToken: () => { return Promise.resolve() },
      isAnonymous: false,
      link: () => { return Promise.resolve() },
      linkWithCredential: () => { return Promise.resolve() },
      linkWithPopup: () => { return Promise.resolve() },
      linkWithRedirect: () => { return Promise.resolve() },
      providerData: [],
      reauthenticate: () => { return Promise.resolve() },
      reauthenticateWithCredential: () => { return Promise.resolve() },
      reauthenticateWithPopup: () => { return Promise.resolve() },
      reauthenticateWithRedirect: () => { return Promise.resolve() },
      refreshToken: 'mock-refresh-token',
      reload: () => { return Promise.resolve() },
      sendEmailVerification: () => { return Promise.resolve() },
      toJSON: () => { return 'mock-json' },
      unlink: () => { return Promise.resolve() },
      updateEmail: () => { return Promise.resolve() },
      updatePassword: () => { return Promise.resolve() },
      updateProfile: () => { return Promise.resolve() }
    }
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: AuthenticationService,
          useValue: MockAuthService
        },
        {
          provide: DataService,
          useValue: MockDataService
        }
      ]
    });
  });

  it('should create', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe('createUser', () => {
    beforeEach(() => {
      newUser = {
        email: 'barry@gmail.com',
        password: 'guess_me',
        username: 'Bazza'
      };
    });

    it('should call createUser on the authentication service correctly',
      inject([UserService], (service: UserService) => {
        // Arrange
        spyOn(service, 'createUserDataEntry');
        MockAuthService.createUser.and.returnValue(Promise.resolve(''));

        // Act
        service.createUser(newUser);

        // Assert
        expect(MockAuthService.createUser).toHaveBeenCalledWith(newUser);
      }));

    describe('successful authentication response', () => {
      beforeEach(() => {
        createdUser = {
          uid: 'some_uid'
        };
        MockAuthService.createUser
          .and.returnValue(Promise.resolve(createdUser));
      });

      it('should call createUserDataEntry correctly',
        fakeAsync(inject([UserService], (service: UserService) => {
          // Arrange
          spyOn(service, 'createUserDataEntry');

          // Act
          service.createUser(newUser);

          // Assert
          const expected = {
            uid: createdUser.uid,
            username: newUser.username
          };
          tick();
          expect(service.createUserDataEntry).toHaveBeenCalledWith(expected);
        })));

      it('should return the response from createUserDataEntry',
        fakeAsync(inject([UserService], (service: UserService) => {
          // Arrange
          spyOn(service, 'createUserDataEntry').and.returnValue('promise');

          // Act
          const result = service.createUser(newUser);
          tick();

          // Assert
          return result.then(response => {
            expect(response).toEqual('promise');
          });
        })));
    });

    describe('failed authentication response', () => {
      beforeEach(() => {
        MockAuthService.createUser.and.returnValue(Promise.reject('error-yo'));
      });

      it('should not call createUserDataEntry',
        fakeAsync(inject([UserService], (service: UserService) => {
          // Arrange
          spyOn(service, 'createUserDataEntry');

          // Act
          service.createUser(newUser).catch(() => {});

          // Assert
          tick();
          expect(service.createUserDataEntry).not.toHaveBeenCalled();
        })));

      it('should return a promise with error response from the auth service',
        fakeAsync(inject([UserService], (service: UserService) => {
          // Act
          let result: any;
          service.createUser(newUser).catch(error => {
            result = error;
          });

          // Assert
          tick();
          expect(result).toEqual('error-yo');
        })));
    });
  });

  describe('createUserDataEntry', () => {
    it('should call createUserEntry on the data service correctly',
      inject([UserService], (service: UserService) => {
        // Arrange
        const userData = {
          uid: 'a-uid',
          username: 'BooBa'
        };
        MockDataService.createUserEntry.and.returnValue(Promise.resolve(''));

        // Act
        service.createUserDataEntry(userData);

        // Assert
        expect(MockDataService.createUserEntry).toHaveBeenCalledWith(userData);
    }));

    describe('successful data service response', () => {
      it('should return promise resolving with dataEntryCreated response true',
        fakeAsync(inject([UserService], (service: UserService) => {
          // Arrange
          userData = {
            uid: 'some_uid',
            username: 'KennyG'
          };
          MockDataService.createUserEntry
            .and.returnValue(Promise.resolve('anything'));

          // Act
          const result = service.createUserDataEntry(userData);

          // Assert
          const expected = {
            uid: userData.uid,
            dataEntryCreated: true
          };
          tick();
          // expect(true).toBe(true);
          result.then(response => {
            expect(response).toEqual(expected);
          });
        })));
    });

    describe('failed data service response', () => {
      it('should return promise resolving with dataEntryCreated response false',
        fakeAsync(inject([UserService], (service: UserService) => {
          // Arrange
          userData = {
            uid: 'some_uid',
            username: 'KennyG'
          };
          MockDataService.createUserEntry
            .and.returnValue(Promise.reject('durp'));

          // Act
          const result = service.createUserDataEntry(userData);

          // Assert
          const expected = {
            uid: userData.uid,
            dataEntryCreated: false
          };
          tick();
          // expect(true).toBe(true);
          result.then(response => {
            expect(response).toEqual(expected);
          });
        })));
    });
  });

  describe('updateProfile', () => {
    beforeEach(() => {
      userDeets = {
        displayName: 'BennyBee',
        photoURL: null
      };
    });

    it('should call updateProfile on the user correctly',
      inject([UserService], (service: UserService) => {
        // Arrange
        spyOn(mockFirebaseUser, 'updateProfile')
          .and.returnValue(Promise.resolve())

        // Act
        service.updateProfile(mockFirebaseUser, userDeets);

        // Assert
        expect(mockFirebaseUser.updateProfile).toHaveBeenCalledWith(userDeets);
      }));

    describe('successful response', () => {
      it('should return promise resolving with profileUpdated true',
        fakeAsync(inject([UserService], (service: UserService) => {
          // Arrange
          spyOn(mockFirebaseUser, 'updateProfile')
            .and.returnValue(Promise.resolve())

          // Act
          const result = service.updateProfile(mockFirebaseUser, userDeets);

          // Assert
          const expected = {
            uid: mockFirebaseUser.uid,
            profileUpdated: true
          };
          tick();
          result.then(response => {
            expect(response).toEqual(expected);
          });
        })));
    });

    describe('failed response', () => {
      it('should return promise resolving with profileUpdated false',
        fakeAsync(inject([UserService], (service: UserService) => {
          // Arrange
          spyOn(mockFirebaseUser, 'updateProfile')
            .and.returnValue(Promise.reject('durp'));

          // Act
          const result = service.updateProfile(mockFirebaseUser, userDeets);

          // Assert
          const expected = {
            uid: mockFirebaseUser.uid,
            profileUpdated: false
          };
          tick();
          result.then(response => {
            expect(response).toEqual(expected);
          });
        })));
    });
  });

  describe('login', () => {
    it('should call login on the authentication service correctly and retrun ' +
      'the response', inject([UserService], (service: UserService) => {
        // Arrange
        const user = {
          email: 'benny@gmail.com',
          password: 'guess_me'
        };
        MockAuthService.login.and.returnValue('beef');

        // Act
        const result = service.login(user);

        // Assert
        expect(MockAuthService.login).toHaveBeenCalledWith(user);
        expect(result).toEqual('beef');
      }));
  });
});
