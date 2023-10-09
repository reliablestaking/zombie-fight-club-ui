import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions, authSelectors } from '@zfc-ui/auth';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { combineLatest, filter, map, startWith } from 'rxjs';

@Component({
  selector: 'zfc-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAnonymous$ = this.store.select(authSelectors.selectIsAnonymous);

  constructor(
    private readonly store: Store,
    private readonly oidcSecurityService: OidcSecurityService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'tweet',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/twitter-logo-white.svg'
      )
    );

    combineLatest([
      this.activatedRoute.queryParamMap.pipe(
        map((params) => params.get('code')),
        filter((code) => code !== null && code !== undefined),
        startWith('')
      ),
      this.activatedRoute.queryParamMap.pipe(
        map((params) => params.get('state')),
        filter((code) => code !== null && code !== undefined),
        startWith('')
      ),
      // the code/token flow will always fail since we're doing it on the server-side.
      // Leaving this here so it clears out the code/state from the query string
      this.oidcSecurityService.checkAuth(),
    ]).subscribe(([code, state]) => {
      if (code && state) {
        this.store.dispatch(
          authActions.authenticatedViaCallback({ code, state })
        );
      } else {
        this.store.dispatch(authActions.notAuthenticatedViaStorage());
      }
    });
  }

  login(): void {
    this.store.dispatch(authActions.startLogin());
  }
}
