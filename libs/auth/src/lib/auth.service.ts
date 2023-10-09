import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SERVICE_URL } from '@zfc-ui/fight-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(SERVICE_URL) private readonly url: string,
    private readonly http: HttpClient
  ) {}

  loginCheck(): Observable<void> {
    return this.http.post<void>(
      `${this.url}/login/check`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  login(code: string, state: string): Observable<any> {
    return this.http.post(
      `${this.url}/login`,
      {},
      {
        withCredentials: true,
        params: {
          code,
          state,
        },
      }
    );
  }
}
