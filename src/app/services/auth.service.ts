import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  createUser(user: any) {
    return this.httpClient.post(`${environment.url}/createUser`, user);
  }

  login(user: any) {
    return this.httpClient.post(`${environment.url}/login`, user);
  }
}
