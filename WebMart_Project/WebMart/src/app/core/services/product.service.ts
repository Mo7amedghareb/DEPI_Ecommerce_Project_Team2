import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductsResponse, ProductResponse } from '../../interfaces/i-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  /**
   * Get all products with optional filters
   * @param filters - Optional filters: category, search, minPrice, maxPrice, sort
   */
  getProducts(filters?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }): Observable<Product[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.category) params = params.set('category', filters.category);
      if (filters.search) params = params.set('search', filters.search);
      if (filters.minPrice !== undefined) params = params.set('minPrice', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) params = params.set('maxPrice', filters.maxPrice.toString());
      if (filters.sort) params = params.set('sort', filters.sort);
    }

    return this.http.get<ProductsResponse>(
      `${this.baseUrl}/products`,
      {
        params,
        headers: { 'Cache-Control': 'no-cache' }
      }
    ).pipe(
      map(response => response?.products
        ? this.processProducts(response.products)
        : []
      )
    );
  }

  /**
   * Get a single product by ID
   * @param id - Product ID
   */
  getProductById(id: string): Observable<Product> {
    return this.http.get<ProductResponse>(
      `${this.baseUrl}/products/${id}`,
      { headers: { 'Cache-Control': 'no-cache' } }
    ).pipe(
      map(response => this.processProduct(response.product))
    );
  }

  /**
   * Process a single product - add defaults and format image
   */
  private processProduct(product: Product): Product {
    return {
      ...product,
      image: this.formatImagePath(product.image),
      oldPrice: product.oldPrice || (product.price + 150),
      colors: product.colors || ['#10243a', '#6c7787', '#222222'],
      sizes: product.sizes || ['S', 'M', 'L', 'XL'],
      badge: product.badge || 'NEW'
    };
  }

  /**
   * Process products array - add defaults and format images
   */
  private processProducts(products: Product[]): Product[] {
    return products.map(product => this.processProduct(product));
  }

  /**
   * Format image path - convert relative paths to absolute
   * If path starts with http or /images, keep it. Otherwise, prepend /images/
   */
  private formatImagePath(imagePath: string): string {
    if (!imagePath) {
      return '/images/product-1.png'; // fallback
    }

    if (imagePath.startsWith('http') || imagePath.startsWith('/images')) {
      return imagePath;
    }

    return `/images/${imagePath}`;
  }
}
