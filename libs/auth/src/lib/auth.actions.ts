import { createAction, props } from '@ngrx/store';

export const authenticatedViaStorage = createAction(
  '[Authentication] Authenticated Via Storage'
);

export const notAuthenticatedViaStorage = createAction(
  '[Authentication] Not Authenticated Via Storage'
);

export const authenticatedViaCallback = createAction(
  '[Authentication] Authenticated Via Callback',
  props<{ code: string; state: string }>()
);

export const startLogin = createAction('[Authentication] Start Login');

export const loginComplete = createAction('[Authentication] Login complete');

export const loginError = createAction('[Authentication] Login error');
