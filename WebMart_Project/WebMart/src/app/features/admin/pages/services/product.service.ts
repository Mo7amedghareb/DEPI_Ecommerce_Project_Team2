import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000/api/products';
  private adminUrl = 'http://localhost:5000/api/admin/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // GET /api/products/:id
  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.adminUrl, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.adminUrl}/${id}`, product);
  }
}