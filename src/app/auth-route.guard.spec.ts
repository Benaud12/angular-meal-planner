import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticationService } from './services';
import { AuthRouteGuard } from './auth-route.guard';
import { Observable } from 'rxjs/Rx';

describe('AuthRouteGuard', () => {
  let MockAuthService: any,
    user: any;

  beforeEach(() => {
    MockAuthService = {
      getAuthState: jasmine.createSpy('getAuthState')
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
          user = {
            uid: 'some-id'
          };
          MockAuthService.getAuthState.and.returnValue(Observable.of(user));

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
          user = null;
          MockAuthService.getAuthState.and.returnValue(Observable.of(user));

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
