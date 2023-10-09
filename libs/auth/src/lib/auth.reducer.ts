import { createReducer, on } from '@ngrx/store';
import { CallState, LoadingState } from '@zfc-ui/shared';
import * as authActions from './auth.actions';

export interface AuthState {
  callState: CallState;
  isAuthenticated: boolean;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  callState: LoadingState.INIT,
};

export const AUTH_FEATURE_KEY = 'auth';

export const authReducer = createReducer(
  initialAuthState,
  on(
    authActions.authenticatedViaCallback,
    authActions.authenticatedViaStorage,
    authActions.loginComplete,
    (state): AuthState => ({
      ...state,
      isAuthenticated: true,
      callState: LoadingState.LOADED,
    })
  ),
  on(
    authActions.loginError,
    (state): AuthState => ({
      ...state,
      isAuthenticated: false,
      callState: LoadingState.LOADED,
    })
  )
);
