import { Component, Input } from '@angular/core';
import { Fight } from '@zfc-ui/fight-state';

@Component({
  selector: 'zfc-ui-pending-fight',
  templateUrl: './pending-fight.component.html',
  styleUrls: ['./pending-fight.component.scss'],
})
export class PendingFightComponent {
  @Input() fight!: Fight;
}
