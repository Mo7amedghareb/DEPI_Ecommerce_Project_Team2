import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  deliveryMethod: 'standard' | 'express' = 'standard';
  paymentMethod: 'card' | 'cod' = 'card';

  shipping = {
    firstName: 'Mohamed',
    lastName: 'Abdullah',
    address: '136 Dokki St.',
    city: 'Giza',
    postalCode: '3337722',
  };

  payment = {
    cardholderName: 'Mohamed Abdullah',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  };

  cartItems = [
    {
      name: 'Relaxed Linen Shirt',
      variant: 'Optic White / Large',
      price: 845,
      image: 'assets/images/products/linen-shirt.jpg',
    },
    {
      name: 'Precision Runner X1',
      variant: 'Heritage Red / US 10',
      price: 850,
      image: 'assets/images/products/runner-x1.jpg',
    },
    {
      name: 'The Meridian Timepiece',
      variant: 'Brushed Steel / One Size',
      price: 400,
      image: 'assets/images/products/timepiece.jpg',
    },
  ];

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  get estimatedTax(): number {
    return 50;
  }

  get total(): number {
    return this.subtotal + this.estimatedTax;
  }

  placeOrder(): void {
    console.log('Order placed', {
      shipping: this.shipping,
      deliveryMethod: this.deliveryMethod,
      paymentMethod: this.paymentMethod,
      total: this.total,
    });
  }
}
