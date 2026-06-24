import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  image: string;
  badge: string;
  colors: string[];
  sizes: string[];
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss'],
})
export class ProductDetails implements OnInit {
  activeTab = 'material';
  quantity = 1;
  selectedSize = 'M';
  selectedColor = '#222222';

  products: Product[] = [
    {
      id: 1,
      name: 'Essential Crew Tee',
      description: 'Optic White / Organic Cotton',
      price: 250,
      oldPrice: 325,
      image: '/images/product-1.png',
      badge: 'NEW',
      colors: ['#e7dfd3', '#222222'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 2,
      name: 'Minimalist Trench Coat',
      description: 'Light Beige / Cotton Blend',
      price: 845,
      oldPrice: 1080,
      image: '/images/product-2.png',
      badge: 'NEW',
      colors: ['#e7dfd3', '#222222'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 3,
      name: 'Archival Wool Overcoat',
      description: 'Oatmeal Melange',
      price: 845,
      oldPrice: 1040,
      image: '/images/product-3.png',
      badge: 'NEW',
      colors: ['#e7dfd3', '#222222'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 4,
      name: 'Urban Velocity Sneaker',
      description: 'Crimson / Performance Mesh',
      price: 545,
      oldPrice: 680,
      image: '/images/product-4.png',
      badge: 'BEST SELLER',
      colors: ['#e7dfd3', '#222222'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 5,
      name: 'Structured Tote Bag',
      description: 'Midnight Black / Calf Leather',
      price: 450,
      oldPrice: 580,
      image: '/images/product-5.png',
      badge: 'SALE 25% OFF',
      colors: ['#e7dfd3', '#222222', '#ffffff'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
  ];

  product: Product = this.products[4];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.product = this.products.find(p => p.id === id) || this.products[4];
      this.selectedColor = this.product.colors[0] || this.selectedColor;
      this.selectedSize = this.product.sizes[0] || this.selectedSize;
      this.quantity = 1;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  increaseQuantity() {
    this.quantity += 1;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }
}

