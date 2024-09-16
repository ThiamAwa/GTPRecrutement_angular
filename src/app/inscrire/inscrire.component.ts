import { Component } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  styleUrls: ['./inscrire.component.css']
})
export class InscrireComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthServiceService) {
    // Initialisation du formulaire avec les champs nécessaires
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid && this.passwordsMatch()) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.errorMessage = null;

        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 422) {

            this.errorMessage = error.error.message || 'Erreur lors de l\'inscription';
            if (error.error.errors?.email) {
              this.errorMessage = "L'email est déjà utilisé.";
            }
          } else {
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
          }
        }
      });
    }
  }

  // Fonction pour vérifier si les mots de passe correspondent
  passwordsMatch(): boolean {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;
  }

}
