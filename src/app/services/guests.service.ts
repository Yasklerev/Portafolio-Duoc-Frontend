import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {
  constructor(private http: HttpClient) {}

  createGuest(Guest: any) {
    return this.http.post(
      `${environment.url}/Guest/createGuest`,
      Guest
    );
  }

  getGuests() {
    return this.http.get(`${environment.url}/guests/listAllGuests`);
  }

  updateGuest(user: any) {
    return this.http.post(`${environment.url}/guests/updateGuest`, user);
  }

  deleteGuest(user: any) {
    return this.http.post(`${environment.url}/guests/deleteGuest`, user);
  }
}
