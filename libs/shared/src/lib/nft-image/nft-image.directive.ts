import { Directive, HostBinding, Input } from '@angular/core';
import { NFT } from '../model/nft.model';
import { getImageUrl } from './utils';

const ASPECT_RATIO = 64;

@Directive({
  selector: '[zfcUiNftImage]',
  standalone: true,
  host: {},
})
export class NftImageDirective {
  @Input('zfcUiNftImage') nft?: NFT;

  @Input() aspectRatio: number | 'inherit' | null = ASPECT_RATIO;

  @HostBinding('src') get src() {
    return getImageUrl(this.nft?.image);
  }

  @HostBinding('alt') get alt() {
    return this.nft?.name;
  }

  @HostBinding('style.width.px') get width() {
    return this.aspectRatio;
  }

  @HostBinding('style.height.px') get height() {
    return this.aspectRatio;
  }
}
