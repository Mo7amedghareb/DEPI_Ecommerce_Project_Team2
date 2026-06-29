import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
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

  featuredProducts = [
    {
      id: 1,
      name: 'Essential Crew Tee',
      description: 'Optic White / Organic Cotton',
      price: 250,
      image: '/images/product-1.png',
      colors: ['#e7dfd3', '#222222'],
    },
    {
      id: 2,
      name: 'Minimalist Trench Coat',
      description: 'Light Beige / Cotton Blend',
      price: 845,
      image: '/images/product-2.png',
      colors: ['#e7dfd3', '#222222'],
    },
    {
      id: 3,
      name: 'Archival Wool Overcoat',
      description: 'Oatmeal Melange',
      price: 845,
      image: '/images/product-3.png',
      colors: ['#e7dfd3', '#222222'],
    },
    {
      id: 4,
      name: 'Urban Velocity Sneaker',
      description: 'Crimson / Performance Mesh',
      price: 545,
      image: '/images/product-4.png',
      colors: ['#e7dfd3', '#222222'],
    },
    {
      id: 5,
      name: 'Structured Tote Bag',
      description: 'Midnight Black / Calf Leather',
      price: 450,
      image: '/images/product-5.png',
      colors: ['#e7dfd3', '#222222'],
    },
  ];

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
}