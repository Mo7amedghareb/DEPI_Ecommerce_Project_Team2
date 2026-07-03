import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutService } from '../../../../core/services/checkout.service';

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
    firstName: '',
    lastName: '',
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

  constructor(
    private checkoutService: CheckoutService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.checkoutService.getCart().subscribe({
      next: (res: any) => {
        this.cartItems = res.cart.items;       // ← عدّل ده
        this.totalPrice = res.cart.totalPrice; // ← وده
        this.isLoading = false;
        this.cdr.detectChanges();              // ← أضف ده
      },
      error: (err: any) => {
        console.error('Failed to load cart:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
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

    const shippingAddress = {
      fullName: `${this.shipping.firstName} ${this.shipping.lastName}`,
      address: this.shipping.address,
      city: this.shipping.city,
      postalCode: this.shipping.postalCode,
      country: this.shipping.country,
    };

    this.checkoutService.placeOrder(shippingAddress, paymentMethod).subscribe({
      next: (res: any) => {
        console.log('Order placed:', res.order);
        this.orderSuccess = true;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.orderError = err.error?.message ?? 'Something went wrong. Please try again.';
        this.cdr.detectChanges();
      },
    });
  }
}