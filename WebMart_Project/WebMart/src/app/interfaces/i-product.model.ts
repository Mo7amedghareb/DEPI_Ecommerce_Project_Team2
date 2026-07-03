export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
  image: string;
  
  // Optional frontend-only fields
  oldPrice?: number;
  colors?: string[];
  sizes?: string[];
  badge?: string;
}

export interface ProductsResponse {
  count: number;
  products: Product[];
}

export interface ProductResponse {
  product: Product;
}
