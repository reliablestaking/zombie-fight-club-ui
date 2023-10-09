import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FightService } from '@zfc-ui/fight-state';
import {
  CallState,
  getCallStateError,
  LoadingState,
  NFT,
} from '@zfc-ui/shared';
import { mergeMap, Observable, switchMap, tap } from 'rxjs';

interface PromoteState {
  callState: CallState;
  nfts: NFT[];
}

@Injectable()
export class PromoteStore extends ComponentStore<PromoteState> {
  private readonly isLoading$ = this.select(
    (state) => state.callState === LoadingState.LOADING
  );
  private readonly error$ = this.select((state) =>
    getCallStateError(state.callState)
  );
  private readonly nfts$ = this.select((state) =>
    state.nfts.sort((a, b) => a.name.localeCompare(b.name))
  );
  readonly vm$ = this.select(
    this.isLoading$,
    this.error$,
    this.nfts$,
    (loading, error, nfts) => ({ loading, error, nfts })
  );

  private readonly setCallState = this.updater(
    (state, callState: CallState) => ({ ...state, callState })
  );
  private readonly setNfts = this.updater((state, nfts: NFT[]) => ({
    ...state,
    nfts,
  }));

  readonly getNfts = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.service.getMyNfts().pipe(
          tapResponse(
            (nfts) => {
              this.setNfts(nfts);
              this.setCallState(LoadingState.LOADED);
            },
            () => {
              this.setCallState({
                errorMsg: 'Error loading NFTs',
              });
              this.snackbar.open(
                'We are unable to get your NFTs, please refresh the page and try again',
                'OK'
              );
            }
          )
        )
      )
    )
  );

  delistNft = this.effect((nft$: Observable<NFT>) =>
    nft$.pipe(
      tap(() => this.setCallState(LoadingState.SAVING)),
      mergeMap((nft) =>
        this.service.delistNft(nft).pipe(
          tapResponse(
            () => {
              this.setCallState(LoadingState.SAVED);
              this.getNfts();
            },
            () => {
              this.setCallState({
                errorMsg: 'Error delisting NFT',
              });
              this.snackbar.open(
                'We are unable to delist this NFT, please refresh the page and try again',
                'OK'
              );
            }
          )
        )
      )
    )
  );

  constructor(
    private readonly service: FightService,
    private readonly snackbar: MatSnackBar
  ) {
    super({
      callState: LoadingState.LOADING,
      nfts: [],
    });
    this.getNfts();
  }
}
