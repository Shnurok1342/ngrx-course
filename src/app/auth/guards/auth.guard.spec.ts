import {TestBed, waitForAsync} from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let store;

  beforeEach(waitForAsync(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['select']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: Store, useValue: storeSpy }
      ]
    })
      .compileComponents()
      .then(() => {
        guard = TestBed.inject(AuthGuard);
        router = TestBed.inject(Router);
        store = TestBed.inject(Store);
      });
  }));

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should pass and not reroute to login page if authorized', () => {
    store.select.and.returnValue(of(true));
    const navigate = spyOn(router, 'navigateByUrl');
    guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{ url: 'courses' }).subscribe(value => {
      expect(value).toBeTrue();
      expect(navigate).not.toHaveBeenCalledWith('/login');
    });
  });

  it('should fail and reroute to login page if not authorized', () => {
    store.select.and.returnValue(of(false));
    const navigate = spyOn(router, 'navigateByUrl');
    guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{ url: 'courses' }).subscribe(value => {
      expect(value).toBeFalse();
      expect(navigate).toHaveBeenCalledWith('/login');
    });
  });
});
