import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private httpClient: HttpClient) {}

  getVendors() {
    return this.httpClient.get(`${environment.url}/employee/listAllEmployee`);
  }
}
