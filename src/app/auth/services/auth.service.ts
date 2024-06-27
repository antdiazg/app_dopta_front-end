import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { LoginResponse, User } from '../interface';
import { Observable, catchError, delay, map, tap, throwError } from 'rxjs';
import { RegistroOrganizacion, RegistroPersona } from '../interface/register-response.interface';
import { AuthStatus } from '../enums/auth-status.enum';
import { environment } from 'src/environments/environment';
import { Organizacion, Persona } from '../interface/user.interface';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.URL_USER;

  private _currentUser = signal<User | null>(null);
  private _currentOrganizacion = signal<Organizacion | null>(null);

  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed<User | null>(() => this._currentUser());
  public currentOrganizacion = computed<Organizacion | null>(() => this._currentOrganizacion());
  public authStatus = computed<AuthStatus>(() => this._authStatus());

  constructor(private http: HttpClient) { }

  private setAuthentication(user: any, token: string): boolean {
    this._authStatus.set(AuthStatus.authenticated);
    this._currentUser.set(user);
    localStorage.setItem('token-jwt', token);
    return true;
  }

  setToken(token: string): boolean {
    localStorage.setItem('token-jwt', token);
    return true;

  }

  login(email: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}user/login/`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap((response: LoginResponse) => {
        this.setAuthentication(response.user, response.access);
        console.log(response.user, response.access);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        return throwError(error); // Reenviar el error para ser manejado en el componente
      })
    );
  };


  getProfile(): Observable<any> {
    const url = `${this.baseUrl}user/perfil/`;
    const token = localStorage.getItem('token-jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers }).pipe(
      tap(response => {
        console.log('User profile:', response);
      }),
      catchError(error => {
        console.error('Profile error:', error);
        return throwError(() => error);

      })
    )
  }

  updateUser(user: FormData): Observable<Persona> {
    const url = `${this.baseUrl}user/perfil/`;
    const token = localStorage.getItem('token-jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Persona>(url, user, { headers }).pipe(
      tap(response => {
        console.log('User updated:', response);
      }),
      catchError(error => {
        console.error('Update error:', error);
        return throwError(() => error);
      })

    );
  }
  updateOrganizacion(user: FormData): Observable<Organizacion> {
    const url = `${this.baseUrl}user/perfil/`;
    const token = localStorage.getItem('token-jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Organizacion>(url, user, { headers }).pipe(
      tap(response => {
        console.log('User updated:', response);
      }),
      catchError(error => {
        console.error('Update error:', error);
        return throwError(() => error);
      })

    );
  }


  logout() {
    localStorage.removeItem('token-jwt');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token-jwt');
  }

  addPerson(persona: RegistroPersona): Observable<RegistroPersona> {
    return this.http.post<RegistroPersona>(`${this.baseUrl}user/persona/registro/`, persona);
  }

  //TODO: modificar para registrar organizacion
  addOrganization(organizacion: RegistroOrganizacion): Observable<RegistroOrganizacion> {
    return this.http.post<RegistroOrganizacion>(`${this.baseUrl}user/organizacion/registro/`, organizacion);
  }


  passRecovery(email: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: email };
    return this.http.post<string>(`${this.baseUrl}user/recuperar/`, body, { headers: headers });
  }



}
