import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  constructor(private api: ApiService) {}

  getCart() {
    return this.api.get<any>('/cart', true);
  }

  placeOrder(shippingAddress: any, paymentMethod: string) {
    return this.api.post<any>(
      '/checkout',
      { shippingAddress, paymentMethod },
      true
    );
  }
}