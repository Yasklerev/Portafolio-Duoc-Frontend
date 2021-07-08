import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get(`${environment.url}/users/listAllUsers`);
  }

  getRoles() {
    return this.httpClient.get(`${environment.url}/users/getRoles`);
  }

  updateUser(user: any) {
    return this.httpClient.post(`${environment.url}/users/updateUser`, user);
  }

  deleteUser(user: any) {
    return this.httpClient.post(`${environment.url}/users/deleteUser`, user);
  }

  getHabitaciones() {
    return this.httpClient.get(`${environment.url}/users/getHabitaciones`);
  }
}
