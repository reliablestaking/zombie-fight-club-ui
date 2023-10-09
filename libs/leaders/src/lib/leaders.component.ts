import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { getImageUrl } from 'libs/shared/src/lib/nft-image/utils';
import { LeadersStore } from './leaders.store';

@Component({
  selector: 'zfc-ui-leaders',
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.scss'],
  providers: [LeadersStore],
})
export class LeadersComponent {
  constructor(
    protected readonly store: LeadersStore,
    protected readonly sanitizer: DomSanitizer
  ) {}

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(getImageUrl(url));
  }
}
