import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, signal} from '@angular/core';
import { LoginResponse, User } from '../interface';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { RegistroPersona } from '../interface/register-response.interface';
import { AuthStatus } from '../enums/auth-status.enum';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://alb-appdoptauser-1760123330.us-east-1.elb.amazonaws.com/';

  private _currentUser  = signal<User | null>( null );
  private _authStatus   = signal<AuthStatus>( AuthStatus.checking );

  public currentUser  = computed<User | null>( () => this._currentUser() );
  public authStatus   = computed<AuthStatus>( () => this._authStatus() );

  constructor(private http: HttpClient){}

  private setAuthentication( user: any, token: string ): boolean {
    this._authStatus.set( AuthStatus.authenticated );
    this._currentUser.set( user );
    localStorage.setItem( 'token-jwt', token);
    return true;
  }

  setToken( token: string ): boolean {
    localStorage.setItem( 'token-jwt', token );
    return true;

  }

login(email: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}user/login/`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap((response: LoginResponse ) => {
        this.setAuthentication(response.user, response.access);
        console.log(response.user, response.access);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error.error.message);
      })
    );
};

getProfile(): Observable<any>{
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

logout(){
  localStorage.removeItem('token-jwt');
}

isAuthenticated(): boolean{
  return !!localStorage.getItem('token-jwt');
}

addPerson( persona : RegistroPersona): Observable<RegistroPersona> {
  return this.http.post<RegistroPersona>(`${ this.baseUrl }user/persona/registro/`, persona);
}

//TODO: modificar para registrar organizacion
addOrganization( persona : RegistroPersona): Observable<RegistroPersona> {
  return this.http.post<RegistroPersona>(`${ this.baseUrl }/user/organizacion/registro/`, persona);
}

personExists(email: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.baseUrl}persona/existe?email=${email}`);
}

passRecovery(email: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: email };
    return this.http.post<string>(`${this.baseUrl}user/recuperar/`, body, { headers: headers });
  }



}
