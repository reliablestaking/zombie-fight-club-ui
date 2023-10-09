import { Component, Input } from '@angular/core';
import { Fight } from '@zfc-ui/fight-state';
import { NFT } from '@zfc-ui/shared';

@Component({
  selector: 'zfc-ui-completed-fight',
  templateUrl: './completed-fight.component.html',
  styleUrls: ['./completed-fight.component.scss'],
})
export class CompletedFightComponent {
  private _fight!: Fight;
  @Input() set fight(fight: Fight) {
    this._fight = fight;
    this.nftImage = {
      name: `fight`,
      image: fight.fightIPFS!,
    };
    this.alienImage = {
      name: `alien`,
      image: fight.alienIPFS!,
    };
  }
  get fight(): Fight {
    return this._fight;
  }

  nftImage: NFT | null = null;
  alienImage: NFT | null = null;
}
