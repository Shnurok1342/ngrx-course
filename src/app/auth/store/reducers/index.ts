import {User} from '../../model/user.model';
import {AuthActions, AuthActionTypes} from '../actions/auth.actions';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined
};

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
