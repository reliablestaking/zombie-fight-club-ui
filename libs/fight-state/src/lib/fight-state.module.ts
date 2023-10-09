import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FightEffects } from './fight.effects';
import { fightReducer, FIGHT_FEATURE_KEY } from './fight.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FIGHT_FEATURE_KEY, fightReducer),
    EffectsModule.forFeature([FightEffects]),
  ],
})
export class FightStateModule {}
