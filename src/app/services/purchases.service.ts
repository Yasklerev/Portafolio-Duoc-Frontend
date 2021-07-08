import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private httpClient: HttpClient) { }


  getPurchases() {
    return this.httpClient.get(`${environment.url}/purchase/listAllPurchases`)
  }

  getVendors() {
    return this.httpClient.get(`${environment.url}/purchase/listAllVendors`)
  }

  creatPurchase(data: any) {
    return this.httpClient.post(`${environment.url}/purchase/createPurchase`, data)
  }

  getPurchase(numero: any) {
    return this.httpClient.get(`${environment.url}/purchase/getPurchase/${numero}`)
  }

  deletePurchase(data: any) {
    return this.httpClient.post(`${environment.url}/purchase/deletePurchase`, data)
  }

  responsePurchase(data: any) {
    return this.httpClient.post(`${environment.url}/purchase/responsePurchase`, data)
  }

  aprobarRechazar(data: any) {
    return this.httpClient.post(`${environment.url}/purchase/aprobarRechazarPurchase`, data)
  }
}
