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

interface HunterState {
  callState: CallState;
  hunters: NFT[];
}

@Injectable()
export class HunterStore extends ComponentStore<HunterState> {
  private readonly isLoading$ = this.select(
    (state) => state.callState === LoadingState.LOADING
  );
  private readonly isError$ = this.select(
    (state) => !!getCallStateError(state.callState)
  );
  private readonly hunters$ = this.select((state) => state.hunters);
  readonly vm$ = this.select(
    this.isLoading$,
    this.isError$,
    this.hunters$,
    (loading, error, hunters) => ({
      loading,
      hunters,
      hasHunters: hunters.length > 0,
      error,
    })
  );

  private readonly setCallState = this.updater(
    (state, callState: CallState) => ({ ...state, callState })
  );
  private readonly setHunters = this.updater((state, hunters: NFT[]) => ({
    ...state,
    hunters,
  }));

  readonly fetchHunters = this.effect((options$: Observable<PickOptions>) =>
    options$.pipe(
      switchMap((options) =>
        this.service.getNftsToFight(NftType.Hunter, options).pipe(
          tapResponse(
            (hunters) => {
              this.setHunters(hunters);
              this.setCallState(LoadingState.LOADED);
            },
            () => {
              this.setCallState({ errorMsg: 'Error loading hunters' });
            }
          )
        )
      )
    )
  );

  readonly setHunter = this.effect((hunter$: Observable<NFT>) =>
    hunter$.pipe(
      tap((hunter) => this.store.dispatch(fightActions.setHunter({ hunter })))
    )
  );

  constructor(
    private readonly service: FightService,
    private readonly store: Store
  ) {
    super({
      callState: LoadingState.LOADING,
      hunters: [],
    });
    this.fetchHunters({
      owned: true,
    });
  }
}
