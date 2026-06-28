import { Component, OnInit } from '@angular/core';
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
    {
      title: 'Men',
      subtitle: 'Timeless essentials for him',
      image: '/images/man.png',
    },
    {
      title: 'Women',
      subtitle: 'Elevated wardrobe staples',
      image: '/images/woman.png',
    },
    {
      title: 'Accessories',
      subtitle: 'The finishing touches',
      image: '/images/accessories.png',
    },
  ];

  featuredProducts: Product[] = [];
  loadingProducts = false;
  errorMessage = '';

  benefits = [
    {
      icon: 'fa-solid fa-truck',
      title: 'Free Shipping',
      subtitle: 'On all orders over $150',
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Secure Payment',
      subtitle: '100% secure checkout',
    },
    {
      icon: 'fa-solid fa-arrows-rotate',
      title: 'Easy Returns',
      subtitle: '30-day hassle-free returns',
    },
    {
      icon: 'fa-solid fa-headset',
      title: 'Premium Support',
      subtitle: '24/7 dedicated assistance',
    },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.loadingProducts = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (products) => {
        // Take first 5 products
        this.featuredProducts = products.slice(0, 5);
        this.loadingProducts = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.errorMessage = 'Failed to load products. Please try again.';
        this.loadingProducts = false;
      }
    });
  }
}