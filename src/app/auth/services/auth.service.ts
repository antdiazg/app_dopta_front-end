import { Injectable, computed, inject, signal } from '@angular/core';
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
  private http: HttpClient         = inject( HttpClient );

  private _currentUser  = signal<User | null>( null );
  private _authStatus   = signal<AuthStatus>( AuthStatus.checking );

  public currentUser  = computed<User |  null>( () => this._currentUser() );
  public authStatus   = computed<AuthStatus>( () => this._authStatus() );




  private setAuthentication(user: User, token: string): boolean {
    this._authStatus.set( AuthStatus.authenticated );
    this._currentUser.set( user );
    localStorage.setItem('token', token);
    return true;
  }

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  login(correo: string, password: string): Observable<void> {
    const url = `${this.baseUrl}/login`;
    const body = { correo: correo, password: password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => {
          this.setAuthentication(user, token);
        }),
        catchError(error => throwError( () => error.error.message)),

      );
  }

  checkAuthStatus(): Observable<boolean> {
    const url: string = `${this.baseUrl}/check-token`;
    const token: string | null = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders()
      .set( 'Authorization', `Bearer ${ token }`);

    if (!token) {
      this.logout();
      return of( false );
    };

    return this.http.get<CheckTokenResponse>(url, { headers: headers })
      .pipe(
        map(({ user, token }) => {
          this.setAuthentication(user, token);
          return true;

        }),

        catchError( () => {
          this._authStatus.set( AuthStatus.notAuthenticated );

          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._currentUser.set( null );
    this._authStatus.set( AuthStatus.notAuthenticated );
  }
}
