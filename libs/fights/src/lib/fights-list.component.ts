import { Component, Input } from '@angular/core';
import { Fight, FightStatus } from '@zfc-ui/fight-state';

@Component({
  selector: 'zfc-ui-fights-list',
  templateUrl: './fights-list.component.html',
  styleUrls: ['./fights-list.component.scss'],
})
export class FightsListComponent {
  @Input() fights?: Fight[] | null;
  readonly FightStatus = FightStatus;
}
