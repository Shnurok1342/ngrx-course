import {AUTH_FEATURE_KEY, AuthPartialState, initialAuthState} from '../reducers/auth.reducers';
import {createPartialStore} from '../../../testing/utils/store.util';
import {userMock} from '../../mocks/user.mock';
import {isLoggedIn, isLoggedOut} from './auth-selectors';

describe('AuthSelectors', () => {
  const key = AUTH_FEATURE_KEY;
  let state: AuthPartialState;

  beforeEach(() => {
    state = createPartialStore(key, initialAuthState);
  });

  it('isLoggedIn() should return is user logged in', () => {
    state = createPartialStore(key, initialAuthState, { user: userMock });
    const result = isLoggedIn(state);
    expect(result).toBeTruthy();
  });

  it('isLoggedOut() should return is user logged out', () => {
    state = createPartialStore(key, initialAuthState);
    const result = isLoggedOut(state);
    expect(result).toBeTruthy();
  });
});
