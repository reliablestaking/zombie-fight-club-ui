import { Component, Input } from '@angular/core';
import { Fight } from '@zfc-ui/fight-state';

@Component({
  selector: 'zfc-ui-in-progress-fight',
  templateUrl: './in-progress-fight.component.html',
  styleUrls: ['./in-progress-fight.component.scss'],
})
export class InProgressFightComponent {
  @Input() fight!: Fight;
}
