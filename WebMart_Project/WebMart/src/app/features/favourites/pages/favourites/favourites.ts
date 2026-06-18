import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface FavouriteProduct {
  id: number;
  name: string;
  variant: string;
  price: number;
  image: string;
  colors: string[]; // hex color values for the swatches
}

// static data
const STATIC_FAVOURITES: FavouriteProduct[] = [
  {
    id: 1,
    name: 'Tapered Wool Trouser',
    variant: 'Charcoal',
    price: 400,
    image: '/3b2ba80eb4ee9da2a6b35218c411282e.jpg',
    colors: ['#d0cece', '#1a1a1a'],
  },
  {
    id: 2,
    name: 'Essential Crew Tee',
    variant: 'Optic White / Organic Cotton',
    price: 250,
    image: '/3b2ba80eb4ee9da2a6b35218c411282e.jpg',
    colors: ['#d0cece', '#1a1a1a'],
  },
  {
    id: 3,
    name: 'Minimalist Trench Coat',
    variant: 'Light Beige / Cotton Blend',
    price: 845,
    image: '/3b2ba80eb4ee9da2a6b35218c411282e.jpg',
    colors: ['#d0cece', '#1a1a1a'],
  },
  {
    id: 4,
    name: 'Urban Velocity Sneaker',
    variant: 'Crimson / Performance Mesh',
    price: 545,
    image: '/3b2ba80eb4ee9da2a6b35218c411282e.jpg',
    colors: ['#d0cece', '#1a1a1a'],
  },
  {
    id: 5,
    name: 'Fine Merino Crewneck',
    variant: 'Deep Navy',
    price: 220,
    image: '/3b2ba80eb4ee9da2a6b35218c411282e.jpg',
    colors: ['#d0cece', '#1a1a1a'],
  },
];

@Component({
  selector: 'app-favourites',
  imports: [RouterLink , CommonModule],
  templateUrl: './favourites.html',
  styleUrl: './favourites.scss',
})
export class Favourites {

  favourites: FavouriteProduct[] = [];

  ngOnInit(): void {
    // Replace this call with your real API
    this.loadFavourites();
  }

  private loadFavourites(): void {
    // Swap STATIC_FAVOURITES with an API response when the backend is ready.
    this.favourites = [...STATIC_FAVOURITES];
  }

 //remove btn
  removeFromFavourites(productId: number): void {
    this.favourites = this.favourites.filter((p) => p.id !== productId);

    // When integrated with an API, also call:

  }

}
