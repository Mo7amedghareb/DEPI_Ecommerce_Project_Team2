import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavouritesService } from '../../../../core/services/favourites.service';
import { IFavouriteProduct } from '../../../../interfaces/i-favourite-product.model';

@Component({
  selector: 'app-favourites',
  imports: [RouterLink, CommonModule],
  templateUrl: './favourites.html',
  styleUrl: './favourites.scss',
})
export class Favourites implements OnInit {
  private readonly favouritesService = inject(FavouritesService);
  private readonly cdr = inject(ChangeDetectorRef);

  favourites: IFavouriteProduct[] = [];
  colors = ['#d0cece', '#1a1a1a'];

  constructor() {}

  ngOnInit(): void {
    this.loadFavourites();
  }

  private loadFavourites(): void {
    this.favouritesService.getFavourites().subscribe({
      next: (res) => {
        this.favourites = res.products;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeFromFavourites(productId: string): void {
    this.favouritesService.removeFavourites(productId).subscribe({
      next: () => {
        this.favourites = this.favourites.filter(p => p._id !== productId);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}