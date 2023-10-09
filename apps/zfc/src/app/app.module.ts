import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from '@zfc-ui/auth';
import { FightStateModule, SERVICE_URL } from '@zfc-ui/fight-state';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthConfigModule } from './auth/auth-config.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    FightStateModule,
    AuthModule,
    MatToolbarModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    HttpClientModule,
    AuthConfigModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: SERVICE_URL,
      useValue: environment.serviceUrl,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
