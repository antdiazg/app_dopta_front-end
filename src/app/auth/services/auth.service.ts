import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { LoginResponse, User } from '../interface';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../interface/register-response.interface';



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

  register(username: string, password: string, email: string , telefono: number, direccion: string, nombre: string, apellido: string): Observable<RegisterResponse> {
  const url = `${this.baseUrl}personas/registro/`; // Replace with your Django registration endpoint
  const body = { username , password , email, telefono, direccion, nombre, apellido };
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.post<RegisterResponse>(url, body, { headers });
}

}
