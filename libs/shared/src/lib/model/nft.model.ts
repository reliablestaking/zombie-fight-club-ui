export interface NFT {
  id?: number;
  name: string;
  type?: string;
  image: string;
  listedPriceAda?: number;
  userOwns?: boolean;
  wins?: number;
  loses?: number;
}

export enum NftType {
  Zombie = 'Zombie',
  Hunter = 'Hunter',
}
