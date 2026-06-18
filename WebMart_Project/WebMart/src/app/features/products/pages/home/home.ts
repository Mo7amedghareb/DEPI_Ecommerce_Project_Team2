import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  categories = [
    { title: 'Men', subtitle: '20 Products', color: '#EAF2FF', accent: '#004AC6' },
    { title: 'Women', subtitle: '16 Products', color: '#FFF4E6', accent: '#FB923C' },
    { title: 'Accessories', subtitle: '12 Products', color: '#E9F7EF', accent: '#16A34A' },
  ];

  featuredProducts = [
    { name: 'Linen Shirt', price: '$42', tag: 'New arrival' },
    { name: 'Summer Dress', price: '$58', tag: 'Popular' },
    { name: 'Smart Watch', price: '$75', tag: 'Best seller' },
    { name: 'Leather Bag', price: '$120', tag: 'Premium' },
  ];
}

