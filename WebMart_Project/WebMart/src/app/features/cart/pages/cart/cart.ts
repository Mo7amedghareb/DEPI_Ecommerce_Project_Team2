import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface CartItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  image: string;
  quantity: number;
  shippingInfo: string;
  shippingInfoClass?: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number | 'Free';
  tax: number;
}

const STATIC_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: 'Relaxed Linen Shirt',
    variant: 'Optic White / Large',
    price: 845,
    image: '/3b2ba80eb4ee9da2a6b35218c411282e.jpg',
    quantity: 1,
    shippingInfo: 'SHIPS IN 2-3 DAYS',
  },
  {
    id: 2,
    name: 'Precision Runner X1',
    variant: 'Heritage Red / US 10',
    price: 850,
    image: '/3b2ba80eb4ee9da2a6b35218c411282e.jpg',
    quantity: 1,
    shippingInfo: 'LIMITED EDITION',
    shippingInfoClass: 'text-danger fw-semibold',
  },
  {
    id: 3,
    name: 'The Meridian Timepiece',
    variant: 'Brushed Steel / One Size',
    price: 400,
    image: '/3b2ba80eb4ee9da2a6b35218c411282e.jpg',
    quantity: 1,
    shippingInfo: 'IN STOCK',
  },
];

const STATIC_ORDER_SUMMARY: OrderSummary = {
  subtotal: 2095,
  shipping: 'Free',
  tax: 50,
};


@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cartItems: CartItem[] = [...STATIC_CART_ITEMS];
  summary: OrderSummary = { ...STATIC_ORDER_SUMMARY };
  promoCode: string = '';
  promoApplied: boolean = false;
  promoError: boolean = false;


  get itemCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get total(): number {
    const shipping = this.summary.shipping === 'Free' ? 0 : this.summary.shipping;
    return this.summary.subtotal + shipping + this.summary.tax;
  }


  increaseQty(item: CartItem): void {
    item.quantity++;
    this.recalcSubtotal();
    // API update
  }

  decreaseQty(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.recalcSubtotal();
      // API update
    }
  }

  removeItem(productId: number): void {
    this.cartItems = this.cartItems.filter((i) => i.id !== productId);
    this.recalcSubtotal();
    // API remove
  }


  applyPromo(): void {
    const valid = ['SAVE10', 'WEBMART'];
    if (valid.includes(this.promoCode.trim().toUpperCase())) {
      this.promoApplied = true;
      this.promoError = false;
    } else {
      this.promoApplied = false;
      this.promoError = true;
    }
  }


  recalcSubtotal(): void {
    this.summary.subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}
