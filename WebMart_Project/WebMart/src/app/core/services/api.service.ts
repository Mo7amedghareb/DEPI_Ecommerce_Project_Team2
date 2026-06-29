import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  get<T>(path: string, auth = false) {
    const headers = auth ? this.getAuthHeaders() : new HttpHeaders();
    return this.http.get<T>(`${this.baseUrl}${path}`, { headers });
  }

  post<T>(path: string, body: any, auth = false) {
    const headers = auth
      ? this.getAuthHeaders().set('Content-Type', 'application/json')
      : new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<T>(`${this.baseUrl}${path}`, body, { headers });
  }
}