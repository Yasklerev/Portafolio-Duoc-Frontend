import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  createCustomer(customer: any) {
    return this.http.post(
      `${environment.url}/customer/createCustomer`,
      customer
    );
  }

  getCustomers() {
    return this.http.get(`${environment.url}/customer/listAllCustomers`);
  }

  updateCustomer(user: any) {
    return this.http.post(`${environment.url}/customer/updateCustomer`, user);
  }

  deleteCustomer(user: any) {
    return this.http.post(`${environment.url}/customer/deleteCustomer`, user);
  }
}
