import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvioceService {
  constructor(private httpCliente: HttpClient) {}

  getInvoices() {
    return this.httpCliente.get(`${environment.url}/invoices/listAllInvioces`);
  }
}
