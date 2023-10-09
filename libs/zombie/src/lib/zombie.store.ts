import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { fightActions, FightService, PickOptions } from '@zfc-ui/fight-state';
import {
  CallState,
  getCallStateError,
  LoadingState,
  NFT,
  NftType,
} from '@zfc-ui/shared';
import { Observable, switchMap, tap } from 'rxjs';

interface ZombieState {
  callState: CallState;
  zombies: NFT[];
}

@Injectable()
export class ZombieStore extends ComponentStore<ZombieState> {
  private readonly isLoading$ = this.select(
    (state) => state.callState === LoadingState.LOADING
  );
  private readonly isError$ = this.select(
    (state) => !!getCallStateError(state.callState)
  );
  private readonly zombies$ = this.select((state) => state.zombies);
  readonly vm$ = this.select(
    this.isLoading$,
    this.isError$,
    this.zombies$,
    (loading, error, zombies) => ({
      loading,
      zombies,
      hasZombies: zombies.length > 0,
      error,
    })
  );

  private readonly setCallState = this.updater(
    (state, callState: CallState) => ({ ...state, callState })
  );
  private readonly setZombies = this.updater((state, zombies: NFT[]) => ({
    ...state,
    zombies,
  }));

  readonly fetchZombies = this.effect((options$: Observable<PickOptions>) =>
    options$.pipe(
      switchMap((options) =>
        this.service.getNftsToFight(NftType.Zombie, options).pipe(
          tapResponse(
            (zombies) => {
              this.setZombies(zombies);
              this.setCallState(LoadingState.LOADED);
            },
            () => {
              this.setCallState({ errorMsg: 'Error loading zombies' });
            }
          )
        )
      )
    )
  );

  readonly setZombie = this.effect((zombie$: Observable<NFT>) =>
    zombie$.pipe(
      tap((zombie) => this.store.dispatch(fightActions.setZombie({ zombie })))
    )
  );

  constructor(
    private readonly service: FightService,
    private readonly store: Store
  ) {
    super({
      callState: LoadingState.LOADING,
      zombies: [],
    });
    this.fetchZombies({
      owned: true,
    });
  }
}
