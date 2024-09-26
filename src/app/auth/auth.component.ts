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

  onSubmit(loginForm: any): void {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (response: any) => {
          console.log('Connexion réussie', response);

          // Stocker le token dans le localStorage
          localStorage.setItem('auth_token', response.token);

          // Stocker l'ID du client dans le localStorage
          if (response.user && response.user.id) {
            localStorage.setItem('clientId', response.user.id.toString());
          }

          // Rediriger l'utilisateur en fonction du rôle
          const role = response.user.role_id;
          if (role === 1) {
            this.router.navigate(['/manager']);
          } else if (role === 2) {
            this.router.navigate(['/client']);
          } else if (role==3){
            this.router.navigate(['/consultant']);
          }else if (role==4) {
            this.router.navigate(['/candidat']);
          }

          // Réinitialiser le formulaire
          loginForm.reset();
        },
        error: (err) => {
          console.error('Erreur lors de la connexion:', err);
          this.errorMessage = 'Invalid email or password'; // Ajustez le message d'erreur si nécessaire
        }
      });
  }
}
