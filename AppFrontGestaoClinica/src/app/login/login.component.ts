import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { lastValueFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
   imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule,],
   providers: [AuthService]
})
export class LoginComponent {
  loginForm: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login:', email, password);
      const credentials = {
        Login: this.loginForm.value.email, // Ou 'email' se for o campo correto
        Senha: this.loginForm.value.password
      };
      try {
        const response = await lastValueFrom(this.authService.login(credentials));

        // Armazenar token (se usar JWT)
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userData', JSON.stringify({
            id: response.userId,
            login: response.login
          }));
        }

        // Redirecionar ou atualizar estado da aplicação
        this.router.navigate(['/']); // Exemplo

      } catch (error: any) {

      }

    }
  }
}