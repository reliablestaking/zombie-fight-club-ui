import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    MatExpansionModule,
    RouterModule,
    MatButtonModule,
  ],
})
export class FaqModule {}
