import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private api: ApiService) { }

  getDashboardStats() {
    return this.api.get<any>('/admin/dashboard', true);
  }

  deleteOrder(orderId: string) {
    return this.api.delete<any>(`/admin/orders/${orderId}`, true);
  }
  addProduct(data: any) {
    return this.api.post<any>('/admin/products', data, true);
  }

  editProduct(id: string, data: any) {
    return this.api.put<any>(`/admin/products/${id}`, data, true);
  }

  getProductById(id: string) {
    return this.api.get<any>(`/products/${id}`, false);
  }



  getCustomers() {
    return this.api.get<any>('/admin/customers', true);
  }

  deleteCustomer(customerId: string) {
    return this.api.delete<any>(`/admin/customers/${customerId}`, true);
  }

  addCustomer(data: any) {
    return this.api.post<any>('/auth/sign-up', data, false);
  }


  getAllOrders() {
    return this.api.get<any>('/admin/orders', true);
  }

  updateOrderStatus(orderId: string, status: string) {
    return this.api.put<any>(`/admin/orders/${orderId}/status`, { status }, true);
  }
}