import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Icart } from '../../../../interfaces/i-cart.model';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly cdr = inject(ChangeDetectorRef);  // ← أضف ده

  cartItems: Icart[] = [];

  summary = {
    subtotal: 0,
    shipping: 'Free' as number | 'Free',
    tax: 50
  };

  promoCode = '';
  promoApplied = false;
  promoError = false;

  constructor() {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.GetUserCart().subscribe({
      next: (res) => {
        if (res.cart) {
          this.cartItems = res.cart.items || [];
          this.summary.subtotal = res.cart.totalPrice || 0;
        } else {
          this.cartItems = res.items || [];
          this.summary.subtotal = res.totalPrice || 0;
        }
        this.cdr.detectChanges();  // ← أضف ده
      },
      error: (err) => {
        console.log(err);
        this.cdr.detectChanges();  // ← وده
      }
    });
  }

  get itemCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get total(): number {
    const shipping = this.summary.shipping === 'Free' ? 0 : this.summary.shipping;
    return this.summary.subtotal + shipping + this.summary.tax;
  }

  increaseQty(item: Icart): void {
    this.cartService.updateQuantity(item._id, item.quantity + 1).subscribe({
      next: (res) => {
        this.cartItems = res.cart.items;
        this.summary.subtotal = res.cart.totalPrice;
        this.cdr.detectChanges();  // ← أضف ده
      },
      error: (err) => console.log(err)
    });
  }

  decreaseQty(item: Icart): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item._id, item.quantity - 1).subscribe({
        next: (res) => {
          this.cartItems = res.cart.items;
          this.summary.subtotal = res.cart.totalPrice;
          this.cdr.detectChanges();  // ← أضف ده
        },
        error: (err) => console.log(err)
      });
    }
  }

  removeItem(cartItemId: string): void {
    this.cartService.RemoveCartItem(cartItemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item._id !== cartItemId);
        this.recalcSubtotal();
        this.cdr.detectChanges();  // ← أضف ده
      },
      error: (err) => console.log(err)
    });
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
      (sum, item) => sum + item.price * item.quantity, 0
    );
  }
}