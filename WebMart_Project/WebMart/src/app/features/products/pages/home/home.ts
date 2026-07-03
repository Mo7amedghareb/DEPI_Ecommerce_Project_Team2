import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../interfaces/i-product.model';
import { FavouritesService } from '../../../../core/services/favourites.service';
import { ProductCard } from '../../../../shared/components/product-card/product-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink,ProductCard],
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
  favouriteIds = new Set<string>();

  constructor(
    private productService: ProductService,
    private favouritesService: FavouritesService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadFavouriteIds();
    this.route.queryParams.subscribe(params => {
      const filters = {
        category: params['category'] || undefined,
        search: params['search'] || undefined,
      };
      this.loadFeaturedProducts(filters);
    });
  }

  loadFavouriteIds(): void {
    this.favouritesService.getFavourites().subscribe({
      next: (res) => {
        this.favouriteIds = new Set(res.products.map((p: any) => p._id));
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  isFavourite(productId: string): boolean {
    return this.favouriteIds.has(productId);
  }

  toggleFavourite(product: Product): void {
    const isFav = this.favouriteIds.has(product._id);

    if (isFav) {
      this.favouritesService.removeFavourites(product._id).subscribe({
        next: () => {
          this.favouriteIds.delete(product._id);
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.favouritesService.addFavourite(product._id).subscribe({
        next: () => {
          this.favouriteIds.add(product._id);
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err)
      });
    }
  }

  loadFeaturedProducts(filters?: { category?: string; search?: string }): void {
    this.loadingProducts = true;
    this.errorMessage = '';

    this.productService.getProducts(filters).subscribe({
      next: (products) => {
        this.featuredProducts = products.slice(0, 10);
        this.loadingProducts = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.errorMessage = 'Failed to load products. Please try again.';
        this.loadingProducts = false;
        this.cdr.detectChanges();
      }
    });
  }
}