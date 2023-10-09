import { InjectionToken } from '@angular/core';
import { NFT, NftType } from '@zfc-ui/shared';

export enum FightStatus {
  Pending = 'PENDING',
  AwaitingPayment = 'AWAITING_PAYMENT',
  PaymentReceived = 'PAYMENT_RECEIVED',
  Minted = 'MINTED',
  Expired = 'EXPIRED',
}

export interface CurrentFight {
  zombie?: NFT;
  hunter?: NFT;
}

export interface Fight {
  ID?: number | undefined;
  zombieName?: string | undefined;
  hunterName?: string | undefined;
  status?: FightStatus | undefined;
  paymentAmountAda?: string | undefined;
  paymentAddress?: string | undefined;
  minutesUntilExpired?: number | undefined;
  createdDate?: string | undefined;
  mintedDate?: string | undefined;
  fightIPFS?: string | undefined;
  alienIPFS?: string | undefined;
  winner?: string | undefined;
  loser?: string | undefined;
  tweetLink?: string | undefined;
}

export const SERVICE_URL = new InjectionToken<string>('url');

interface LeaderBoardEntry {
  name: string;
  type: NftType;
  image: string;
  userOwns: boolean;
  wins: number;
  loses: number;
}

export interface LeaderBoard {
  mostWins: LeaderBoardEntry[];
  mostLoses: LeaderBoardEntry[];
  bestPercent: LeaderBoardEntry[];
}

export interface PickOptions {
  name?: string;
  owned: boolean;
}
