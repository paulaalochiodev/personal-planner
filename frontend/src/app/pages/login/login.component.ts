import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService, 
    private router: Router) 
    { }

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido! Token:', response.token);
        this.router.navigate(['/lista']);
      },
      error: (err) => {
        console.error('Erro no login. Usuário ou senha inválidos', err);
      }
    });
  }
}
