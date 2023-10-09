import { Component } from '@angular/core';
import { PickOptions } from '@zfc-ui/fight-state';
import { NFT } from '@zfc-ui/shared';
import { ZombieStore } from './zombie.store';

@Component({
  selector: 'zfc-ui-zombie',
  templateUrl: './zombie.component.html',
  styleUrls: ['./zombie.component.scss'],
  providers: [ZombieStore],
})
export class ZombieComponent {
  readonly vm$ = this.store.vm$;

  constructor(private readonly store: ZombieStore) {}

  pick(zombie: NFT): void {
    if (zombie) {
      this.store.setZombie(zombie);
    }
  }

  setOptions(options: PickOptions): void {
    this.store.fetchZombies(options);
  }
}
