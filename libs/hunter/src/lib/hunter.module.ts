import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PickLayoutComponent } from '@zfc-ui/shared';
import { HunterRoutingModule } from './hunter-routing.module';
import { HunterComponent } from './hunter.component';

@NgModule({
  declarations: [HunterComponent],
  imports: [
    CommonModule,
    HunterRoutingModule,
    MatProgressBarModule,
    PickLayoutComponent,
  ],
})
export class HunterModule {}
