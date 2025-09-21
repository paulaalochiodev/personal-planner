import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.register(this.credentials).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso!', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao registrar usuário', err);
      }
    });
  }
}