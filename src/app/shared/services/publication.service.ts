import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private baseUrl = environments.baseUrl2;

  constructor(private http: HttpClient) { }
  obtenerMascotas(): Observable<any> {
    return this.http.get(`${this.baseUrl}mascotas/lista-publicaciones/`);
  }


}
