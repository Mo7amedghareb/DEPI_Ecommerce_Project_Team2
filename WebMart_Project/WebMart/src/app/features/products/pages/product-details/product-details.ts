import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';

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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProductDetails(id);
        this.loadRelatedProducts(id);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
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
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.errorMessage = 'Failed to load product details. Please try again.';
        this.loadingProductDetails = false;
      }
    });
  }

  loadRelatedProducts(currentProductId: string): void {
    this.loadingRelatedProducts = true;

    this.productService.getProducts().subscribe({
      next: (products) => {
        // Filter out current product and take first 5 related products
        this.relatedProducts = products
          .filter(p => p._id !== currentProductId)
          .slice(0, 5);
        this.loadingRelatedProducts = false;
      },
      error: (err) => {
        console.error('Error loading related products:', err);
        this.loadingRelatedProducts = false;
      }
    });
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  increaseQuantity(): void {
    this.quantity += 1;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  addToCart(): void {
    if (this.product) {
      console.log('Add to Cart:', {
        productId: this.product._id,
        quantity: this.quantity,
        selectedColor: this.selectedColor,
        selectedSize: this.selectedSize
      });
      
    }
  }

  toggleFavourite(product: Product): void {
    console.log('Toggle favourite for product:', product._id);
    
  }
}

