import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {

  constructor(private httpClient:HttpClient) {}

  getFavourites():Observable<any> {
    return this.httpClient.get(`${enviroment.baseUrl}/user/favourites`);
  }

  removeFavourites(productId: string): Observable<any> {
    return this.httpClient.delete(`${enviroment.baseUrl}/user/favourites/${productId}`);
  }
}
