import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: environment.nftKeyUrl,
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: environment.oauthClientId,
        scope: 'openid assets offline_access offline',
        responseType: 'code',
        silentRenew: false,
        useRefreshToken: false,
        disablePkce: true,
        // renewTimeBeforeTokenExpiresInSeconds: 30,
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
