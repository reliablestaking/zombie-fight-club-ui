import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FightService, LeaderBoard } from '@zfc-ui/fight-state';
import { CallState, LoadingState } from '@zfc-ui/shared';
import { switchMap } from 'rxjs';

interface LeadersState {
  callState: CallState;
  leaderBoard: LeaderBoard | undefined;
}

@Injectable()
export class LeadersStore extends ComponentStore<LeadersState> {
  private readonly isLoading$ = this.select(
    (state) => state.callState === LoadingState.LOADING
  );
  private readonly leaderBoard$ = this.select((state) => state.leaderBoard);

  readonly vm$ = this.select(
    this.isLoading$,
    this.leaderBoard$,
    (isLoading, leaderBoard) => ({ isLoading, leaderBoard })
  );

  private readonly setCallState = this.updater(
    (state, callState: CallState): LeadersState => ({
      ...state,
      callState,
    })
  );

  private readonly setLeaderBoard = this.updater(
    (state, leaderBoard: LeaderBoard): LeadersState => ({
      ...state,
      leaderBoard,
      callState: LoadingState.LOADED,
    })
  );

  private readonly getLeaderBoard = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.service.getLeaders().pipe(
          tapResponse(
            (leaderBoard) => {
              this.setLeaderBoard(leaderBoard);
            },
            () => {
              0;
              this.setCallState({ errorMsg: 'Error loading leader board' });
            }
          )
        )
      )
    )
  );

  constructor(private readonly service: FightService) {
    super({
      callState: LoadingState.INIT,
      leaderBoard: undefined,
    });
    this.getLeaderBoard();
  }
}
