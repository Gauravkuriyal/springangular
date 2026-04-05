import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, LoginRequest, SignupRequest } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  signup(data: SignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/customers/signup`, data);
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/customers/login`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders() {
    const token = this.getToken();
    return { Authorization: `Bearer ${token}` };
  }
}
