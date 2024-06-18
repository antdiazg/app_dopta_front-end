import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private baseUrl = environments.URL_POST;

  constructor(private http: HttpClient) { }

  obtenerMascotas(): Observable<any> {
    return this.http.get(`${this.baseUrl}mascotas/lista-publicaciones/`);
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
    return this.http.post(url, formData, {headers});
  }

  // Crear publicación de Servicio
  crearServicioPublicacion(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}servicios/crear-publicacion/`;
    const token = localStorage.getItem('token-jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(url, formData, {headers});
  }

}
