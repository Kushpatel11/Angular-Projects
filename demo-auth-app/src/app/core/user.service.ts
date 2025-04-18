// src/app/core/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signal, signal } from '@angular/core';

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000/auth';

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, payload);
  }

  signup(payload: SignupPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, payload);
  }

  userProfile = signal<any>(null);

  getProfile() {
    return this.http.get(this.baseUrl);
  }

  updateProfile(updatedData: any) {
    return this.http.put(this.baseUrl, updatedData);
  }

  deleteAccount() {
    return this.http.delete(this.baseUrl);
  }
}
