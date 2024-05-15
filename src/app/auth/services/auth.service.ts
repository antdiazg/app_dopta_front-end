import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environments } from '../../../environments/environment';
import { CheckTokenResponse, LoginResponse, User } from '../interface/index';
import { AuthStatus } from '../enums/auth-status.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environments.baseUrl;
  private _currentUser: User | null = null;
  private _authStatus: AuthStatus = AuthStatus.checking;

  public get currentUser(): User | null {
    return this._currentUser;
  }

  public get authStatus(): AuthStatus {
    return this._authStatus;
  }

  constructor(private http: HttpClient) {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): void {
    this._authStatus = AuthStatus.authenticated;
    this._currentUser = user;
    localStorage.setItem('token', token);
  }

  login(correo: string, password: string): Observable<void> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { correo: correo, password: password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => {
          this.setAuthentication(user, token);
        }),
        catchError(error => throwError(error.error.message))
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const url: string = `${this.baseUrl}/auth/check-token`;
    const token: string | null = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers: headers })
      .pipe(
        map(({ user, token }) => {
          this.setAuthentication(user, token);
          return true;
        }),
        catchError(() => {
          this._authStatus = AuthStatus.notAuthenticated;
          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._currentUser = null;
    this._authStatus = AuthStatus.notAuthenticated;
  }
}
