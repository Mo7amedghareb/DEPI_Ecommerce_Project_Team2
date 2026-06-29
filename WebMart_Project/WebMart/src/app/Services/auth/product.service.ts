import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:5000/api'; 

  constructor(private http: HttpClient) {}

  addProduct(productData: any, token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/admin/products`, productData, { headers });
  }
}