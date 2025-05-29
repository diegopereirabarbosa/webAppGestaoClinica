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

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  this.loginForm = this.fb.group({
    email: ["", Validators.required],
    senha: ["", Validators.required],
  });

  this.verificaLogin();
  }

  verificaLogin() {
    const token = localStorage.getItem('token' });
    if (token.value != null) {
      this.router.navigate(['/dashboard']);
    }
  }

  async login() {
    if (this.loginForm.valid) {
          const email = this.formLogin.get('email')?.value;
          const senha = this.formLogin.get('senha')?.value;
          this.authService.login(email, senha).subscribe({
          next: async (res) => {
            this.authService.saveAuthData(res.token, res.refreshToken, res.user);
            this.router.navigate(['/dashboard']);
          },
          error: async (erro) => {
           // this.falhaLogin(erro);
          }
        });
    }
  }
}
