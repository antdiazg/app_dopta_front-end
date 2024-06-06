import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { LoginResponse } from '../interface';
import { Observable } from 'rxjs';
import { RegistroPersona } from '../interface/register-response.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient){}

login(email: string, password: string): Observable<LoginResponse> {
  const url = `${this.baseUrl}login/`;
  const body = { email, password };
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.post<LoginResponse>(url, body, { headers });
}

addPerson( persona : RegistroPersona): Observable<RegistroPersona> {
  return this.http.post<RegistroPersona>(`${ this.baseUrl }persona/registro/`, persona);
}

//TODO: modificar para registrar organizacion
addOrganization( persona : RegistroPersona): Observable<RegistroPersona> {
  return this.http.post<RegistroPersona>(`${ this.baseUrl }persona/registro/`, persona);
}

personExists(email: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.baseUrl}persona/existe?email=${email}`);
}

passRecovery(email: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: email };
    return this.http.post<string>(`${this.baseUrl}recuperar/`, body, { headers: headers });
  }

}
