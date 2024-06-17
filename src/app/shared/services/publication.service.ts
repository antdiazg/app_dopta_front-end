import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';
import { MascotaInput } from 'src/app/dashboard/Interfaces/mascota.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private baseUrl = environments.URL_POST;

  constructor(private http: HttpClient) { }
  obtenerMascotas(): Observable<any> {
    return this.http.get(`${this.baseUrl}mascotas/lista-publicaciones/`);
  }


  crearMascotaPublicacion(mascota: MascotaInput): Observable<any> {
    const url = `${this.baseUrl}mascotas/crear-publicacion/`;
    const token = localStorage.getItem('token-jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(url, mascota, {headers});
  }
}
