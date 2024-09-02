import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) { }

  onSubmit(loginForm:any): void {
    this.authService.login({ email: this.email, password: this.password })
    .subscribe({
      next: (response) => {
        console.log('Connexion réussie', response);
        this.router.navigate(['/manager']);
        loginForm.reset();
      },
      error: (err) => {
        console.error('Erreur lors de la connexion:', err);
        // Gérer l'erreur de connexion
      }
    });

  }
}
