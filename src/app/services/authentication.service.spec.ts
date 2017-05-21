import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let MockAngularFireAuth: any,
    MockFirebaseAuth: any,
    mockUser: any;

  beforeEach(() => {
    MockFirebaseAuth = {
      createUserWithEmailAndPassword:
        jasmine.createSpy('createUserWithEmailAndPassword'),
      signInWithEmailAndPassword:
        jasmine.createSpy('signInWithEmailAndPassword')
    };
    MockAngularFireAuth = {
      auth: MockFirebaseAuth,
      authState: 'mock-auth-state'
    };
    mockUser = {
      email: 'billy@gmail.com',
      password: 'guess_me'
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
    it('should call createUserWithEmailAndPassword on the firebase auth ' +
      'service and return the response', inject([AuthenticationService],
      (service: AuthenticationService) => {
        // Arrange
        MockFirebaseAuth.createUserWithEmailAndPassword
          .and.returnValue('promise');

        // Act
        const result = service.createUser(mockUser);

        // Assert
        expect(MockFirebaseAuth.createUserWithEmailAndPassword)
          .toHaveBeenCalledWith(mockUser.email, mockUser.password);
        expect(result).toEqual('promise');
      }));
  });

  describe('getAuthState', () => {
    it('should return the angularfire authState',
      inject([AuthenticationService], (service: AuthenticationService) => {
        // Act
        const result = service.getAuthState();

        // Assert
        expect(result).toEqual('mock-auth-state');
      }));
  });

  describe('login', () => {
    it('should call signInWithEmailAndPassword on the firebase auth service ' +
      'and return the response', inject([AuthenticationService],
      (service: AuthenticationService) => {
        // Arrange
        MockFirebaseAuth.signInWithEmailAndPassword.and.returnValue('promise');

        // Act
        const result = service.login(mockUser);

        // Assert
        expect(MockFirebaseAuth.signInWithEmailAndPassword)
          .toHaveBeenCalledWith(mockUser.email, mockUser.password);
        expect(result).toEqual('promise');
      }));
  });
});
