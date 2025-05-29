import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly TOKEN_KEY = 'accessToken';
  private readonly REFRESH_KEY = 'refreshToken';
  private readonly USER_KEY = 'userData';

  constructor() {}

  // Salvar dados no localStorage
  saveAuthData(token: string, refreshToken: string, userData: any): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.REFRESH_KEY, refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
  }

  // Recuperar token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Recuperar refreshToken
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  // Recuperar dados do usuário
  getUserData(): any | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  // Limpar dados ao fazer logout
  clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Verifica se o usuário está autenticado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
