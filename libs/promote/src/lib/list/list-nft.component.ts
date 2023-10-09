import { Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NFT } from '@zfc-ui/shared';
import { filter, ReplaySubject, takeUntil } from 'rxjs';
import { ListStore } from './list-nft.store';

@Component({
  selector: 'zfc-ui-list',
  templateUrl: './list-nft.component.html',
  styleUrls: ['./list-nft.component.scss'],
  providers: [ListStore],
})
export class ListNftComponent implements OnDestroy {
  nft!: NFT;

  @ViewChild(NgForm) readonly form!: NgForm;

  private readonly destroy$ = new ReplaySubject<void>(1);

  constructor(
    private readonly store: ListStore,
    @Inject(MAT_DIALOG_DATA) private readonly data: { nft: NFT },
    private readonly dialog: MatDialogRef<ListNftComponent>
  ) {
    this.nft = this.data.nft;

    this.store.saved$
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe(() => this.dialog.close());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  list(): void {
    this.store.listNft(this.nft);
  }
}
