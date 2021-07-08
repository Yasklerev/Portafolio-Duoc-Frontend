import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComedorService {
  constructor(private httpClient: HttpClient) {}

  getTipoPlatos() {
    return this.httpClient.get(environment.url + '/comedor/tipoPlatos');
  }

  saveMinuta(data: any) {
    return this.httpClient.post(
      environment.url + '/comedor/guardarMinuta',
      data
    );
  }

  getMinuta() {
    return this.httpClient.get(environment.url + '/comedor/minutas');
  }
}
