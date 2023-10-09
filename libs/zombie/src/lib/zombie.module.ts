import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ZombieRoutingModule } from './zombie-routing.module';
import { ZombieComponent } from './zombie.component';

import { PickLayoutComponent } from '@zfc-ui/shared';

import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ZombieComponent],
  imports: [
    CommonModule,
    ZombieRoutingModule,
    MatProgressBarModule,
    PickLayoutComponent,
  ],
})
export class ZombieModule {}
