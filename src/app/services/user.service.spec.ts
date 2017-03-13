import { async, fakeAsync, TestBed, inject, tick } from '@angular/core/testing';
import { AuthenticationService, DataService } from './';
import { UserService } from './user.service';

describe('UserService', () => {
  let MockAuthService: any,
    MockDataService: any,
    newUser: any,
    createdUser: any,
    userData: any;

  beforeEach(() => {
    MockAuthService = {
      createUser: jasmine.createSpy('createUser')
    };
    MockDataService = {
      createUserEntry: jasmine.createSpy('createUserEntry')
    };
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
});
