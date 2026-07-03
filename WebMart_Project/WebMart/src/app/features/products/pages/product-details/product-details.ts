import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../interfaces/i-product.model';
import { CartService } from '../../../../core/services/cart.service';
import { FavouritesService } from '../../../../core/services/favourites.service';

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

  product: Product | null = null;
  relatedProducts: Product[] = [];
  loadingProductDetails = false;
  loadingRelatedProducts = false;
  errorMessage = '';

  cartSuccess = false;
  cartError = '';
  favouriteSuccess = false;
  favouriteIds = new Set<string>();  // ← يتبع كل المفضلين

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private favouritesService: FavouritesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFavouriteIds();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProductDetails(id);
        this.loadRelatedProducts(id);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  loadProductDetails(id: string): void {
    this.loadingProductDetails = true;
    this.errorMessage = '';

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.selectedColor = product.colors?.[0] || '#222222';
        this.selectedSize = product.sizes?.[0] || 'M';
        this.quantity = 1;
        this.loadingProductDetails = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.errorMessage = 'Failed to load product details. Please try again.';
        this.loadingProductDetails = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadRelatedProducts(currentProductId: string): void {
    this.loadingRelatedProducts = true;

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.relatedProducts = products
          .filter(p => p._id !== currentProductId)
          .slice(0, 5);
        this.loadingRelatedProducts = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading related products:', err);
        this.loadingRelatedProducts = false;
        this.cdr.detectChanges();
      }
    });
  }

  selectColor(color: string): void { this.selectedColor = color; }
  selectSize(size: string): void { this.selectedSize = size; }
  increaseQuantity(): void { this.quantity += 1; }
  decreaseQuantity(): void { if (this.quantity > 1) this.quantity -= 1; }
  selectTab(tab: string): void { this.activeTab = tab; }

  addToCart(): void {
    if (!this.product) return;

    this.cartService.addToCart(this.product._id, this.quantity).subscribe({
      next: () => {
        this.cartSuccess = true;
        this.cartError = '';
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/cart']);
        }, 1000);
      },
      error: (err) => {
        this.cartError = err.status === 401
          ? 'Please login first'
          : 'Failed to add to cart';
        this.cdr.detectChanges();
      }
    });
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
}