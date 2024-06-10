import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http: HttpClient) { }
  obtenerMascotas(): Observable<any> {
    return this.http.get('http://localhost:8001/mascotas/lista-publicaciones/');
  }
}
