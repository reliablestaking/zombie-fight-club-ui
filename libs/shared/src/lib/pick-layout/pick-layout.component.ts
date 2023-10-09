import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { PickOptions } from '@zfc-ui/fight-state';
import { map, startWith } from 'rxjs/operators';
import { NFT } from '../model/nft.model';
import { NftImageDirective } from '../nft-image/nft-image.directive';

@Component({
  selector: 'zfc-ui-pick-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    LayoutModule,
    NftImageDirective,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './pick-layout.component.html',
  styleUrls: ['./pick-layout.component.scss'],
})
export class PickLayoutComponent {
  @Input() nfts!: NFT[];

  owned = true;
  name = '';

  @Output() selected = new EventEmitter<NFT>();
  @Output() optionsChanged = new EventEmitter<PickOptions>();

  readonly columns$ = this.breakpointObserver
    .observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
    .pipe(
      map(({ breakpoints }) => {
        if (breakpoints[Breakpoints.XLarge] || breakpoints[Breakpoints.Large]) {
          return 4;
        } else if (breakpoints[Breakpoints.Medium]) {
          return 3;
        } else if (breakpoints[Breakpoints.Small]) {
          return 2;
        } else {
          return 1;
        }
      })
    );

  readonly gutter$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map(({ matches }) => (matches ? 16 : 32)),
      startWith(32),
      map((value) => value + '')
    );

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  emitOptions(): void {
    this.optionsChanged.next({
      owned: this.owned,
      name: this.name,
    });
  }

  clearSearch(): void {
    this.name = '';
    this.emitOptions();
  }
}
