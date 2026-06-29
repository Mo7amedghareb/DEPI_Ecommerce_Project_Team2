import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavouritesService } from '../../../../Services/favourites/favourites-service';
import { IFavouriteProduct } from '../../../../interfaces/i-favourite-product';



@Component({
  selector: 'app-favourites',
  imports: [RouterLink, CommonModule],
  templateUrl: './favourites.html',
  styleUrl: './favourites.scss',
})
export class Favourites implements OnInit {
  private readonly favouritesService = inject(FavouritesService);

  favourites: IFavouriteProduct[] = [];

  colors = ['#d0cece', '#1a1a1a'];

  constructor() {}

  ngOnInit(): void {
    this.loadFavourites();
  }

  private loadFavourites(): void {
    this.favouritesService.getFavourites().subscribe({
      next:((res) => {
        console.log(res);
        this.favourites = res.products;
      }),
      error:((err) => {
        console.log(err);
      })
    })
  }

  removeFromFavourites(productId: string): void {
    this.favouritesService.removeFavourites(productId).subscribe({
      next: (res) => {
        this.favourites = this.favourites.filter(
          (product) => product._id !== productId
        );
      },
      error: (err) => {
        console.error( err);
      }
    });
  }
}
