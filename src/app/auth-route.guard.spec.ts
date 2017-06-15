import { TestBed, async, inject } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './services';
import { AuthRouteGuard } from './auth-route.guard';
import { Observable } from 'rxjs/Rx';

describe('AuthRouteGuard', () => {
  let mockActivatedRoute: ActivatedRouteSnapshot,
    mockAuthService: any,
    mockRouterService: any,
    mockRouterState: RouterStateSnapshot,
    user: any;

  beforeEach(() => {
    mockAuthService = {
      getAuthState: jasmine.createSpy('getAuthState')
    };
    mockRouterService = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };
    mockActivatedRoute = new ActivatedRouteSnapshot();
    mockRouterState = {
      url: 'some-url',
      toString: () => { return 'something' },
      root: mockActivatedRoute
    };
    TestBed.configureTestingModule({
      providers: [
        AuthRouteGuard,
        {
          provide: AuthenticationService,
          useValue: mockAuthService
        },
        {
          provide: Router,
          useValue: mockRouterService
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
          mockAuthService.getAuthState.and.returnValue(Observable.of(user));

          // Act
          const result = guard.canActivate(mockActivatedRoute, mockRouterState);

          // Assert
          return result.subscribe(auth => {
            return expect(auth).toEqual(true);
          });
        })));
    });

    describe('not authenticated', () => {
      it('should navigate router to /login and return observable resolving ' +
        'to false', async(inject([AuthRouteGuard], (guard: AuthRouteGuard) => {
          // Arrange
          mockAuthService.getAuthState.and.returnValue(Observable.of(null));

          // Act
          const result = guard.canActivate(mockActivatedRoute, mockRouterState);

          // Assert
          return result.subscribe(auth => {
            return Promise.all([
              expect(mockRouterService.navigateByUrl)
                .toHaveBeenCalledWith('/login'),
              expect(auth).toEqual(false)
            ]);
          });
        })));
    });
  });
});
