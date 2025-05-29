import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import { Router } from '@angular/router';


// Interfaces no escopo do arquivo (fora da classe)
export interface LoginCredentials {
  Login: string;
  Senha: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  userId?: number;
  login?: string;
  token?: string;
  tokenExpires?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private readonly AUTH_KEY = 'isAuthenticated';

  private apiUrl = environment.apiUrl; // Usando a URL do environment

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/TbLogins/Login`, credentials).pipe(
      tap(() => {
        this.isAuthenticated = true;
        localStorage.setItem(this.AUTH_KEY, 'true');
      }),
      catchError((error: HttpErrorResponse) => {
        this.clearAuthData();
        let errorMessage = 'Erro durante o login';
        
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else {
          if (error.status === 0) {
            errorMessage = 'Sem conexão com o servidor';
          } else if (error.status === 401) {
            errorMessage = error.error?.message || 'Credenciais inválidas';
          } else if (error.status >= 500) {
            errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          }
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Verifica tanto o estado local quanto o armazenamento persistente
    return this.isAuthenticated || localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  // Verifica o estado de autenticação ao iniciar o aplicativo
  checkAuthState(): void {
    this.isAuthenticated = localStorage.getItem(this.AUTH_KEY) === 'true';
  }
}