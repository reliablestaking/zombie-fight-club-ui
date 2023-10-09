import { createAction, props } from '@ngrx/store';
import { NFT } from '@zfc-ui/shared';
import { Fight } from './fight.model';

export const getFights = createAction('[Fight] Get Fights');

export const setFights = createAction(
  '[Fight] Set Fights',
  props<{ fights: Fight[] }>()
);

export const setZombie = createAction(
  '[Fight] Set Zombie',
  props<{ zombie: NFT }>()
);
export const setHunter = createAction(
  '[Fight] Set Hunter',
  props<{ hunter: NFT }>()
);

export const startFight = createAction('[Fight] Start');

export const setErrorState = createAction(
  '[Fight] Set Error State',
  props<{ message: string; hide?: boolean }>()
);

export const fightStarted = createAction(
  '[Fight] Started',
  props<{ fight: Fight }>()
);

export const fightInvalid = createAction('[Fight] Invalid');
