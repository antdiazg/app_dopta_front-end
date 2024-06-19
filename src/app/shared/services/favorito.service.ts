import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  private apiUrl = environments.URL_POST;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token-jwt'); // O la forma en que obtienes el token
    const headers = new HttpHeaders()
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return headers;
    }
    return headers;
  }

  addFavorito(mascotaId: number): Observable<any> {
    console.log('entrando...');
    return this.http.post(`${this.apiUrl}favoritos/agregar/mascota/${mascotaId}`, { headers: this.getHeaders() });
  }

  removeFavorito(mascotaId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}favoritos/remover/mascota/${mascotaId}`, { headers: this.getHeaders() });
  }
}
