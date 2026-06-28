import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  signup(data: SignupPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/sign-up`, data);
  }

  signin(data: SigninPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/sign-in`, data);
  }
}