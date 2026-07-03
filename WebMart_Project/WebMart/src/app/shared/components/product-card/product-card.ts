import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../interfaces/i-product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  @Input() isFavourite = false;
  @Input() showFavouriteButton = true;

  @Output() favouriteToggled = new EventEmitter<Product>();

  onToggleFavourite(event: Event): void {
    event.stopPropagation();
    this.favouriteToggled.emit(this.product);
  }
}