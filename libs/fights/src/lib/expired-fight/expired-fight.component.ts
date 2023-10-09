import { Component, Input } from '@angular/core';
import { Fight } from '@zfc-ui/fight-state';

@Component({
  selector: 'zfc-ui-expired-fight',
  templateUrl: './expired-fight.component.html',
  styleUrls: ['./expired-fight.component.scss'],
})
export class ExpiredFightComponent {
  @Input() fight!: Fight;
}
