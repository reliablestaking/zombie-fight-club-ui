import { Component } from '@angular/core';
import { PickOptions } from '@zfc-ui/fight-state';
import { NFT } from '@zfc-ui/shared';
import { HunterStore } from './hunter.store';

@Component({
  selector: 'zfc-ui-hunter',
  templateUrl: './hunter.component.html',
  styleUrls: ['./hunter.component.scss'],
  providers: [HunterStore],
})
export class HunterComponent {
  readonly vm$ = this.store.vm$;

  constructor(private readonly store: HunterStore) {}

  pick(hunter: NFT): void {
    if (hunter) {
      this.store.setHunter(hunter);
    }
  }

  setOptions(options: PickOptions): void {
    this.store.fetchHunters(options);
  }
}
