import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let MockAngularFireAuth: any;

  beforeEach(() => {
    MockAngularFireAuth = {
      createUser: jasmine.createSpy('createUser')
    };
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: AngularFireAuth,
          useValue: MockAngularFireAuth
        }
      ]
    });
  });

  it('should create', inject([AuthenticationService],
    (service: AuthenticationService) => {
      // Assert
      expect(service).toBeTruthy();
    }));

  describe('createUser', () => {
    it('should call createUser on the firebase auth service and return the ' +
      'response', inject([AuthenticationService],
      (service: AuthenticationService) => {
        // Arrange
        const newUser = {
          email: 'billy@gmail.com',
          password: 'guess_me'
        };
        MockAngularFireAuth.createUser.and.returnValue('promise');

        // Act
        const result = service.createUser(newUser);

        // Assert
        expect(MockAngularFireAuth.createUser).toHaveBeenCalledWith(newUser);
        expect(result).toEqual('promise');
      }));
  });

  describe('getAuth', () => {
    it('should return firebase auth service', inject([AuthenticationService],
      (service: AuthenticationService) => {
        // Act
        const result = service.getAuth();

        // Assert
        expect(result).toEqual(MockAngularFireAuth);
      }));
  });
});
