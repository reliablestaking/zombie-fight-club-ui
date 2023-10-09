import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectIsAnonymous = createSelector(
  selectIsAuthenticated,
  (authed) => !authed
);
