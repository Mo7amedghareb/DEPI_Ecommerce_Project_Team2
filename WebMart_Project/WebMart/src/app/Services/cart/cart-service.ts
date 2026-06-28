import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor(private httpclient:HttpClient) {}

  GetUserCart():Observable<any> {
    return this.httpclient.get(`${enviroment.baseUrl}/cart`);
  }

  RemoveCartItem(idPrd:string):Observable<any> {
    return this.httpclient.delete(`${enviroment.baseUrl}/cart/${idPrd}`);
  }

  updateQuantity(cartItemId: string, quantity: number): Observable<any> {
    return this.httpclient.put(`${enviroment.baseUrl}/cart/${cartItemId}`,
      {
        quantity
      }
    );
  }

  addToCart(productId: string, quantity: number = 1): Observable<any> {
    return this.httpclient.post(
      `${enviroment.baseUrl}/cart`,
      {
        productId,
        quantity
      }
    );
  }
}
