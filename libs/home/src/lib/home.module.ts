import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LetModule } from '@ngrx/component';
import { FightsModule } from '@zfc-ui/fights';
import { NftImageDirective } from '@zfc-ui/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    FightsModule,
    MatButtonModule,
    NftImageDirective,
    LetModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
})
export class HomeModule {}
