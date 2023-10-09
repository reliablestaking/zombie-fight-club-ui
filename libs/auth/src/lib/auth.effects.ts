import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fightActions } from '@zfc-ui/fight-state';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { catchError, defer, map, mergeMap, of, switchMap, tap } from 'rxjs';
import * as authActions from './auth.actions';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  readonly loginCheck$ = createEffect(() =>
    defer(() =>
      this.service.loginCheck().pipe(
        map(() => authActions.loginComplete()),
        catchError(() => of(authActions.notAuthenticatedViaStorage()))
      )
    )
  );

  readonly startLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.startLogin),
        tap(() => {
          this.oidcSecurityService.authorize();
        })
      ),
    { dispatch: false }
  );

  readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.authenticatedViaCallback),
      switchMap(({ code, state }) =>
        this.service.login(code, state).pipe(
          map(() => authActions.loginComplete()),
          catchError(() => of(authActions.loginError()))
        )
      )
    )
  );

  readonly triggerGetFights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginComplete),
      mergeMap(() => [fightActions.getFights()])
    )
  );

  readonly loginError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginError),
        tap(() =>
          this.snackbar.open(
            'We are unable to log you in, please try again later',
            'OK'
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly service: AuthService,
    private readonly oidcSecurityService: OidcSecurityService,
    private readonly snackbar: MatSnackBar
  ) {}
}
