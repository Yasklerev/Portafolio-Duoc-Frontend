import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HostalService {
  constructor(private httpClient: HttpClient) {}

  getHostales() {
    return this.httpClient.get(`${environment.url}/hostal/listAllHostal`);
  }
}