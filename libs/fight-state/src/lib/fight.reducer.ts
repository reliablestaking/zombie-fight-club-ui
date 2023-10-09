import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CallState, LoadingState } from '@zfc-ui/shared';
import * as fightActions from './fight.actions';
import { CurrentFight, Fight } from './fight.model';

export const FIGHT_FEATURE_KEY = 'fight';

export interface FightState extends EntityState<Fight> {
  callState: CallState;
  currentFight: CurrentFight;
}

function sortById(a: Fight, b: Fight): number {
  return (b.ID ?? 0) - (a.ID ?? 0);
}

const adapter = createEntityAdapter<Fight>({
  selectId: (fight) => (fight.ID ?? '').toString(),
  sortComparer: sortById,
});

const initialFightState: FightState = adapter.getInitialState({
  callState: LoadingState.INIT,
  currentFight: {},
});

export const fightReducer = createReducer(
  initialFightState,
  on(
    fightActions.setHunter,
    (state, { hunter }): FightState => ({
      ...state,
      callState: LoadingState.INIT,
      currentFight: { ...state.currentFight, hunter },
    })
  ),
  on(
    fightActions.setZombie,
    (state, { zombie }): FightState => ({
      ...state,
      callState: LoadingState.INIT,
      currentFight: { ...state.currentFight, zombie },
    })
  ),
  on(
    fightActions.startFight,
    (state): FightState => ({ ...state, callState: LoadingState.SAVING })
  ),
  on(
    fightActions.setFights,
    (state, { fights }): FightState =>
      adapter.setAll(fights, {
        ...state,
        callState: LoadingState.LOADED,
      })
  ),
  on(
    fightActions.setErrorState,
    (state, { message }): FightState => ({
      ...state,
      callState: { errorMsg: message },
    })
  ),
  on(
    fightActions.getFights,
    (state): FightState => ({ ...state, callState: LoadingState.LOADING })
  ),
  on(
    fightActions.fightStarted,
    (state, { fight }): FightState =>
      adapter.addOne(fight, {
        ...state,
        callState: LoadingState.SAVED,
        currentFight: {},
      })
  ),
  on(fightActions.fightInvalid, (state) => ({
    ...state,
    callState: LoadingState.LOADED,
  }))
);

export const { selectAll } = adapter.getSelectors();
