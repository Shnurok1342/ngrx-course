import {Action, Store} from '@ngrx/store';
import {AUTH_FEATURE_KEY, AuthPartialState, initialAuthState} from '../reducers/auth.reducers';
import {AuthEffects} from './auth.effects';
import {Observable} from 'rxjs';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {cold} from 'jasmine-marbles';
import {Login, Logout} from '../actions/auth.actions';
import {userMock} from '../../mocks/user.mock';
import {TestColdObservable} from 'jasmine-marbles/src/test-observables';

describe('AuthEffects', () => {
  const key = AUTH_FEATURE_KEY;
  let store: Store<AuthPartialState>;
  let effects: AuthEffects;
  let router: Router;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {[key]: initialAuthState}
        })
      ]
    });
    effects = TestBed.inject(AuthEffects);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  describe('login$', () => {
    it('should set user data in local storage', () => {
      spyOn(localStorage, 'setItem');
      actions$ = cold('a', { a: new Login({ user: userMock }) });
      expect(effects.login$).toBeObservable(actions$ as TestColdObservable);
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(userMock));
    });
  });

  describe('logout$', () => {
    it('should remove user data from local storage and route to login page', () => {
      spyOn(localStorage, 'removeItem');
      spyOn(router, 'navigateByUrl');
      actions$ = cold('a', { a: new Logout() });
      expect(effects.logout$).toBeObservable(actions$ as TestColdObservable);
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });

});
