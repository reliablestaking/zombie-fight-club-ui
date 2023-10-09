import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { authSelectors } from '@zfc-ui/auth';
import {
  catchError,
  concatMap,
  defer,
  filter,
  interval,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import * as fightActions from './fight.actions';
import * as fightSelectors from './fight.selectors';
import { FightService } from './fight.service';

@Injectable()
export class FightEffects {
  readonly loadFights$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fightActions.getFights),
      switchMap(() =>
        this.service.getFights().pipe(
          map((fights) => fightActions.setFights({ fights })),
          catchError(() =>
            of(
              fightActions.setErrorState({
                message: 'Unable to load fights',
                hide: true,
              })
            )
          )
        )
      )
    );
  });

  readonly loadFightsOnTimer$ = createEffect(() =>
    defer(() =>
      interval(60000).pipe(
        concatLatestFrom(() =>
          this.store.select(authSelectors.selectIsAuthenticated)
        ),
        filter(([, isAuthenticated]) => isAuthenticated),
        map(() => fightActions.getFights())
      )
    )
  );

  readonly startFight$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fightActions.startFight),
      concatLatestFrom(() =>
        this.store.select(fightSelectors.selectCurrentFight)
      ),
      concatMap(([, { hunter, zombie }]) => {
        if (!hunter?.userOwns && !zombie?.userOwns) {
          return of(fightActions.fightInvalid());
        }

        return this.service
          .startFight({
            hunterName: hunter!.name,
            zombieName: zombie!.name,
          })
          .pipe(
            map((fight) => fightActions.fightStarted({ fight })),
            catchError(() =>
              of(
                fightActions.setErrorState({
                  message:
                    'Error starting fight, please refresh the page and try again',
                })
              )
            )
          );
      })
    );
  });

  readonly fightInvalid$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fightActions.fightInvalid),
        tap(() =>
          this.snackbar.open(
            'You must own either the zombie, or the hunter.  Please choose a different fighter.',
            'OK'
          )
        )
      ),
    { dispatch: false }
  );

  readonly reloadFights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fightActions.fightStarted),
      map(() => fightActions.getFights())
    )
  );

  readonly navigateHome$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fightActions.setZombie, fightActions.setHunter),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      );
    },
    { dispatch: false }
  );

  readonly showError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fightActions.setErrorState),
        filter(({ hide }) => !hide),
        tap(({ message }) => this.snackbar.open(message, 'OK'))
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly service: FightService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar
  ) {}
}
