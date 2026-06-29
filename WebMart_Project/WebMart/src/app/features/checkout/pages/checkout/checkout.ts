import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {
  deliveryMethod: 'standard' | 'express' = 'standard';
  paymentMethod: 'card' | 'cod' = 'card';
  cartItems: any[] = [];
  totalPrice = 0;
  isLoading = true;
  orderSuccess = false;
  orderError = '';

  shipping = {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Egypt',
  };

  payment = {
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  };

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit() {
    this.checkoutService.getCart().subscribe({
      next: (res: any) => {
        this.cartItems = res.cart.items;
        this.totalPrice = res.cart.totalPrice;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load cart:', err);
        this.isLoading = false;
      },
    });
  }

  get estimatedTax(): number {
    return 50;
  }

  get total(): number {
    return this.totalPrice + this.estimatedTax;
  }

  placeOrder() {
    this.orderError = '';
    const paymentMethod = this.paymentMethod === 'cod' ? 'cash' : 'card';

    this.checkoutService.placeOrder(this.shipping, paymentMethod).subscribe({
      next: (res: any) => {
        console.log('Order placed:', res.order);
        this.orderSuccess = true;
      },
      error: (err: any) => {
        this.orderError = err.error?.message ?? 'Something went wrong. Please try again.';
      },
    });
  }
}
