import {authReducer, AuthState, initialAuthState} from './auth.reducers';
import {userMock} from '../../mocks/user.mock';
import {Login, Logout} from '../actions/auth.actions';
import {createState} from '../../../testing/utils/store.util';

describe('AuthReducer', () => {
  let state: AuthState;

  beforeEach(() => {
    state = createState(initialAuthState);
  });

  it('LoginAction should set user', () => {
    const action = new Login({ user: userMock });
    const result = authReducer(state, action);
    expect(result.user).toBeTruthy();
    expect(result.user).toBe(userMock);
  });

  it('LogoutAction should empty user', () => {
    const action = new Logout();
    const stateWithUser: AuthState = createState(state, {user: userMock});
    const result = authReducer(stateWithUser, action);
    expect(result.user).toBeFalsy();
  });

  it('should return the previous state if unknown action', () => {
    const action = {} as any;
    const result = authReducer(undefined, action);
    expect(result).toBe(initialAuthState);
  });
});
