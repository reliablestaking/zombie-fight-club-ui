import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NFT, NftType } from '@zfc-ui/shared';
import { map, Observable } from 'rxjs';
import { Fight, LeaderBoard, PickOptions, SERVICE_URL } from './fight.model';

@Injectable({ providedIn: 'root' })
export class FightService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(SERVICE_URL) private readonly url: string
  ) {}

  getMyNfts(): Observable<NFT[]> {
    return this.httpClient.get<NFT[]>(`${this.url}/user/nfts`, {
      withCredentials: true,
    });
  }

  listNft(nft: NFT): Observable<NFT> {
    return this.httpClient.put<NFT>(`${this.url}/user/nfts/${nft.name}`, nft, {
      withCredentials: true,
    });
  }

  delistNft(nft: NFT): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/user/nfts/${nft.name}`, {
      withCredentials: true,
    });
  }

  getNftsToFight(type: NftType, options: PickOptions): Observable<NFT[]> {
    return this.httpClient
      .get<NFT[]>(`${this.url}/fightnfts`, {
        params: {
          type,
          ...options,
        },
        withCredentials: true,
      })
      .pipe(map((nfts) => nfts.sort((a, b) => a.name.localeCompare(b.name))));
  }

  getFights(): Observable<Fight[]> {
    return this.httpClient.get<Fight[]>(`${this.url}/user/fights`, {
      withCredentials: true,
    });
  }

  startFight(fight: Fight): Observable<Fight> {
    return this.httpClient.post<Fight>(`${this.url}/fights`, fight, {
      withCredentials: true,
    });
  }

  getFightStatus(id: number): Observable<Fight> {
    return this.httpClient.get(`${this.url}/fights/${id}`, {
      withCredentials: true,
    });
  }

  getLeaders(): Observable<LeaderBoard> {
    return this.httpClient.get<LeaderBoard>(`${this.url}/leaders`, {
      withCredentials: true,
    });
  }
}
