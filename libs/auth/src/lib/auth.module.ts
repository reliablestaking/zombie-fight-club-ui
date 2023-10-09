import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import { authReducer, AUTH_FEATURE_KEY } from './auth.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
    EffectsModule.forFeature([AuthEffects]),
    MatSnackBarModule,
  ],
})
export class AuthModule {}
