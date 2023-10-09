import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoadingState } from '@zfc-ui/shared';
import { FightState, FIGHT_FEATURE_KEY, selectAll } from './fight.reducer';

const selectFightState = createFeatureSelector<FightState>(FIGHT_FEATURE_KEY);

const selectFightCallState = createSelector(
  selectFightState,
  (state) => state.callState
);

export const selectFightsLoading = createSelector(
  selectFightCallState,
  (callState) =>
    callState === LoadingState.LOADING || callState === LoadingState.INIT
);

export const selectFights = createSelector(selectFightState, selectAll);

export const selectCurrentFight = createSelector(
  selectFightState,
  (state) => state.currentFight
);

export const selectCurrentZombie = createSelector(
  selectCurrentFight,
  (fight) => fight?.zombie
);

export const selectCurrentHunter = createSelector(
  selectCurrentFight,
  (fight) => fight?.hunter
);

export const selectCurrentFightIsValid = createSelector(
  selectCurrentFight,
  (fight) => !!fight?.hunter && !!fight.zombie
);

export const selectCurrentFightIsInvalid = createSelector(
  selectCurrentFightIsValid,
  (valid) => !valid
);

export const selectFightSaving = createSelector(
  selectFightCallState,
  (callState) => callState === LoadingState.SAVING
);
