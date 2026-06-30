
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private baseUrl = `${enviroment.baseUrl}/admin`;

  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get<any>(`${this.baseUrl}/customers`);
  }

  getDashboardStats() {
    return this.http.get<any>(`${this.baseUrl}/dashboard`);
  }
}