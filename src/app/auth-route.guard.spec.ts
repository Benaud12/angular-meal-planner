import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticationService } from './services';
import { AuthRouteGuard } from './auth-route.guard';
import { FirebaseAuthState, AuthProviders } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

describe('AuthRouteGuard', () => {
  let MockAuthService: any,
    authState: any;

  beforeEach(() => {
    MockAuthService = {
      getAuth: jasmine.createSpy('getAuth')
    };
    TestBed.configureTestingModule({
      providers: [
        AuthRouteGuard,
        {
          provide: AuthenticationService,
          useValue: MockAuthService
        }
      ]
    });
  });

  it('should create', async(inject([AuthRouteGuard],
    (guard: AuthRouteGuard) => {
      // Assert
      expect(guard).toBeTruthy();
    })));

  describe('canActivate', () => {
    describe('authenticated', () => {
      it('should return observable resolving to true',
        async(inject([AuthRouteGuard], (guard: AuthRouteGuard) => {
          // Arrange
          authState = 'truthy thing';
          MockAuthService.getAuth
            .and.returnValue(Observable.of(authState));

          // Act
          const result = guard.canActivate();

          // Assert
          result.subscribe(auth => {
            expect(auth).toEqual(true);
          });
        })));
    });

    describe('not authenticated', () => {
      it('should return observable resolving to false',
        async(inject([AuthRouteGuard], (guard: AuthRouteGuard) => {
          // Arrange
          authState = null;
          MockAuthService.getAuth
            .and.returnValue(Observable.of(authState));

          // Act
          const result = guard.canActivate();

          // Assert
          result.subscribe(auth => {
            expect(auth).toEqual(false);
          });
        })));
    });
  });
});
