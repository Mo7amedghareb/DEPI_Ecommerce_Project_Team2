import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderStatus {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:5000/api/admin/orders';

  constructor(private http: HttpClient) {}

  // GET /api/admin/orders/:id
  getOrderById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // PUT /api/admin/orders/:id/status
  updateOrderStatus(id: string, status: OrderStatus['status']): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/status`, { status });
  }

  getAllOrders(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}