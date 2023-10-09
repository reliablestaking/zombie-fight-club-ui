import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PromoteRoutingModule } from './promote-routing.module';
import { PromoteComponent } from './promote.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NftImageDirective } from '@zfc-ui/shared';
import { ListNftComponent } from './list/list-nft.component';

@NgModule({
  declarations: [PromoteComponent, ListNftComponent],
  imports: [
    CommonModule,
    PromoteRoutingModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule,
    NftImageDirective,
  ],
})
export class PromoteModule {}
