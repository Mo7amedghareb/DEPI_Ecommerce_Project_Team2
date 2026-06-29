import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  heroImage = '/images/background.png';
  saleImage = '/images/background-2.png';

  categories = [
    { title: 'Men', subtitle: 'Timeless essentials for him', image: '/images/man.png' },
    { title: 'Women', subtitle: 'Elevated wardrobe staples', image: '/images/woman.png' },
    { title: 'Accessories', subtitle: 'The finishing touches', image: '/images/accessories.png' },
  ];

  featuredProducts: Product[] = [];
  loadingProducts = false;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef   // ← أضف ده
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.loadingProducts = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products.slice(0, 5);
        this.loadingProducts = false;
        this.cdr.detectChanges();   // ← وأضف ده
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.errorMessage = 'Failed to load products. Please try again.';
        this.loadingProducts = false;
        this.cdr.detectChanges();   // ← وده
      }
    });
  }
}