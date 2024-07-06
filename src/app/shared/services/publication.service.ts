import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mascota } from 'src/app/auth/interface/index'

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private baseUrl = environment.URL_POST;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token-jwt');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  obtenerMascotas(): Observable<any> {
    return this.http.get(`${this.baseUrl}mascotas/lista-publicaciones/`, { headers: this.getHeaders() });
  }
  // ---
  obtenerMascotasFiltradas(filtros: any): Observable<Mascota[]> {
    let params = new HttpParams();

    // Iterar sobre los filtros y añadirlos como parámetros
    for (const key in filtros) {
      if (filtros.hasOwnProperty(key) && filtros[key]) {
        params = params.append(key, filtros[key]);
      }
    }

    return this.http.get<Mascota[]>(`${this.baseUrl}mascotas/lista-publicaciones/`, { params });
  }
  // ---

  obtenerMascotaPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}mascotas/lista-publicaciones/${id}/`, { headers: this.getHeaders() });
  }

  obtenerEventos(): Observable<any> {
    return this.http.get(`${this.baseUrl}eventos/lista-publicaciones/`);
  }

  obtenerServicios(): Observable<any> {
    return this.http.get(`${this.baseUrl}servicios/lista-publicaciones/`);
  }

  // Crear publicación de Mascota
  crearMascotaPublicacion(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}mascotas/crear-publicacion/`;
    const token = localStorage.getItem('token-jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(url, formData, { headers });
  }


  // Crear publicación de Evento
  crearEventoPublicacion(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}eventos/crear-publicacion/`;
    const token = localStorage.getItem('token-jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(url, formData, { headers });
  }

  // Crear publicación de Servicio
  crearServicioPublicacion(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}servicios/crear-publicacion/`;
    const token = localStorage.getItem('token-jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(url, formData, { headers });
  }

}
