// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://127.0.0.1:8000'; // Adjust for deployment

export interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${BASE_URL}/signup`, payload);
  }

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${BASE_URL}/login`, payload);
  }
}
