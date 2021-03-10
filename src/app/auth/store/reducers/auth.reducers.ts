import {User} from '../../model/user.model';
import {AuthActions, AuthActionTypes} from '../actions/auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined
};

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export function authReducer(
  state = initialAuthState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        user: action.payload.user
      };

    case AuthActionTypes.LogoutAction:
      return {
        user: undefined
      };

    default:
      return state;
  }
}
