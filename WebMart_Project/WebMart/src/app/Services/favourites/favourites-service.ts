import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';
import { AuthService } from '../auth/auth';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Cache-Control': 'no-cache'
    });
  }

  getFavourites(): Observable<any> {
    return this.httpClient.get(
      `${enviroment.baseUrl}/user/favourites`,
      { headers: this.getHeaders() }
    );
  }

  addFavourite(productId: string): Observable<any> {
    return this.httpClient.post(
      `${enviroment.baseUrl}/user/favourites`,
      { productId },
      { headers: this.getHeaders() }
    );
  }

  removeFavourites(productId: string): Observable<any> {
    return this.httpClient.delete(
      `${enviroment.baseUrl}/user/favourites/${productId}`,
      { headers: this.getHeaders() }
    );
  }
}