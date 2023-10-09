import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CopyInputModule, NftImageDirective } from '@zfc-ui/shared';
import { CountdownModule } from 'ngx-countdown';
import { CompletedFightComponent } from './completed-fight/completed-fight.component';
import { ExpiredFightComponent } from './expired-fight/expired-fight.component';
import { FightStatusPipe } from './fight-status.pipe';
import { FightsListComponent } from './fights-list.component';
import { InProgressFightComponent } from './in-progress-fight/in-progress-fight.component';
import { PendingFightComponent } from './pending-fight/pending-fight.component';

@NgModule({
  imports: [
    CommonModule,
    NftImageDirective,
    MatGridListModule,
    CopyInputModule,
    CountdownModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    FightsListComponent,
    FightStatusPipe,
    PendingFightComponent,
    CompletedFightComponent,
    InProgressFightComponent,
    ExpiredFightComponent,
  ],
  exports: [FightsListComponent],
})
export class FightsModule {}
