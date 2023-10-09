import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NFT } from '@zfc-ui/shared';
import { take } from 'rxjs';
import { ListNftComponent } from './list/list-nft.component';
import { PromoteStore } from './promote.store';

@Component({
  selector: 'zfc-ui-promote',
  templateUrl: './promote.component.html',
  styleUrls: ['./promote.component.scss'],
  providers: [PromoteStore],
})
export class PromoteComponent {
  readonly vm$ = this.store.vm$;
  readonly displayedColumns = ['image', 'name', 'type', 'actions'];
  constructor(
    private readonly store: PromoteStore,
    private readonly dialog: MatDialog
  ) {}

  list(nft: NFT): void {
    this.dialog
      .open(ListNftComponent, {
        data: {
          nft,
        },
        minWidth: '360px',
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this.store.getNfts());
  }

  delist(nft: NFT): void {
    this.store.delistNft(nft);
  }
}
