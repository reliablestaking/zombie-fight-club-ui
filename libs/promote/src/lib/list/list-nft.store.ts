import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FightService } from '@zfc-ui/fight-state';
import { CallState, LoadingState, NFT } from '@zfc-ui/shared';
import { mergeMap, Observable, tap } from 'rxjs';

interface ListState {
  callState: CallState;
}

@Injectable()
export class ListStore extends ComponentStore<ListState> {
  private readonly callState$ = this.select((s) => s.callState);

  readonly saved$ = this.select(
    this.callState$,
    (s) => s === LoadingState.SAVED
  );

  private readonly setCallState = this.updater(
    (state, callState: CallState) => ({ ...state, callState })
  );

  listNft = this.effect((nft$: Observable<NFT>) =>
    nft$.pipe(
      tap(() => this.setCallState(LoadingState.SAVING)),
      mergeMap((nft) =>
        this.service.listNft(nft).pipe(
          tapResponse(
            () => {
              this.setCallState(LoadingState.SAVED);
            },
            () => {
              this.setCallState({
                errorMsg: 'Error listing NFT',
              });
              this.snackbar.open(
                'We are unable to list this NFT, please refresh the page and try again',
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
    });
  }
}
