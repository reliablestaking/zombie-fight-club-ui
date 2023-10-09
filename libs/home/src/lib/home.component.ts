import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions, authSelectors } from '@zfc-ui/auth';
import { fightActions, fightSelectors } from '@zfc-ui/fight-state';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'zfc-ui-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isAuthenticated$ = this.store.select(authSelectors.selectIsAuthenticated);
  isAnonymous$ = this.store.select(authSelectors.selectIsAnonymous);

  fightInvalid$ = this.store.select(fightSelectors.selectCurrentFightIsInvalid);

  fights$ = this.store.select(fightSelectors.selectFights);
  fightsLoading$ = this.store.select(fightSelectors.selectFightsLoading);

  fightsVm$ = combineLatest([this.fights$, this.fightsLoading$]).pipe(
    map(([fights, loading]) => ({ fights, loading }))
  );

  currentZombie$ = this.store.select(fightSelectors.selectCurrentZombie);

  currentHunter$ = this.store.select(fightSelectors.selectCurrentHunter);

  saving$ = this.store.select(fightSelectors.selectFightSaving);

  constructor(private readonly store: Store) {}

  startFight(): void {
    this.store.dispatch(fightActions.startFight());
  }

  login(): void {
    this.store.dispatch(authActions.startLogin());
  }
}
