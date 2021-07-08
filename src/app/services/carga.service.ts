import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpEvent,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CargaService {
  constructor(private http: HttpClient) {}

  load(data: any) {
    return this.http.post(environment.url + '/load-user/load', data);
  }

  tipoSolicitudes() {
    return this.http.get(environment.url + '/load-user/tipo-solicitudes');
  }

  crearSolicitud(data: any) {
    return this.http.post(environment.url + '/load-user/crear-solicitud', data);
  }

  obtenerSolicitudes() {
    return this.http.get(environment.url + '/load-user/obtener-solicitudes');
  }

  obtenerSolicitud(data: any) {
    return this.http.post(environment.url + '/load-user/obtener-solicitud', data);
  }
}
