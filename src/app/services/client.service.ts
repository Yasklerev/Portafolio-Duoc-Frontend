import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get(`${environment.url}/load-user/listAllUsersBusiness`);
  }
}
