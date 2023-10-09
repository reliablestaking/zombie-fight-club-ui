import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { LeadersComponent } from './leaders.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatListModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LeadersComponent },
    ]),
  ],
  declarations: [LeadersComponent],
})
export class LeadersModule {}
