import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { APP_SETTINGS } from './app.settings';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken = signal('');
  private authUrl = inject(APP_SETTINGS).apiUrl + '/auth';
  isLoggedIn = computed(() => this.accessToken() !== '');

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.authUrl}/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          this.accessToken.set(response.token);
        }),
      );
  }

  logout() {
    this.accessToken.set('');
  }
}
