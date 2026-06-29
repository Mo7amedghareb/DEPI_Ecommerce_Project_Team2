import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';
import { AuthService } from '../auth/auth';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor(
    private httpclient: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Cache-Control': 'no-cache'
    });
  }

  GetUserCart(): Observable<any> {
    return this.httpclient.get(
      `${enviroment.baseUrl}/cart`,
      { headers: this.getHeaders() }
    );
  }

  RemoveCartItem(idPrd: string): Observable<any> {
    return this.httpclient.delete(
      `${enviroment.baseUrl}/cart/${idPrd}`,
      { headers: this.getHeaders() }
    );
  }

  updateQuantity(cartItemId: string, quantity: number): Observable<any> {
    return this.httpclient.put(
      `${enviroment.baseUrl}/cart/${cartItemId}`,
      { quantity },
      { headers: this.getHeaders() }
    );
  }

  addToCart(productId: string, quantity: number = 1): Observable<any> {
    return this.httpclient.post(
      `${enviroment.baseUrl}/cart`,
      { productId, quantity },
      { headers: this.getHeaders() }
    );
  }
}