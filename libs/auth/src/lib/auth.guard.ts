import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { authSelectors } from '@zfc-ui/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private readonly store: Store, private readonly router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.isAuthenticated();
  }
  canLoad(): Observable<boolean | UrlTree> {
    return this.isAuthenticated();
  }

  private isAuthenticated(): Observable<boolean | UrlTree> {
    return this.store
      .select(authSelectors.selectIsAuthenticated)
      .pipe(
        map(
          (isAuthenticated) =>
            isAuthenticated || this.router.createUrlTree(['/'])
        )
      );
  }
}
