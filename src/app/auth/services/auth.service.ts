import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000'; // Cambia esto por la URL de tu backend
  private http: HttpClient = inject( HttpClient );

  constructor() { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  logout() {
    // Implementa la lógica de cierre de sesión aquí si es necesario
  }
}
