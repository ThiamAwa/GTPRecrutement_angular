import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { CandidatServiceService } from '../service/candidat-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-candidat',
  templateUrl: './modifier-candidat.component.html',
  styleUrls: ['./modifier-candidat.component.css']
})
export class ModifierCandidatComponent implements OnInit {
  candidat: any = {}; // Initialiser candidat à un objet vide pour éviter les erreurs
  candidatId!: number; // Ajouter '!' pour indiquer que cette propriété sera initialisée plus tard

  constructor(
    private authService: AuthServiceService,
    private candidatService: CandidatServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du candidat à partir des paramètres de la route
    this.route.params.subscribe(params => {
      this.candidatId = +params['id']; // Convertir en nombre
      this.getCandidat(); // Appeler la méthode pour récupérer les données du candidat
    });
  }

  getCandidat(): void {
    this.candidatService.getCandidat(this.candidatId).subscribe(
      (candidat) => {
        this.candidat = candidat; // Affecter les données récupérées à la propriété candidat
      },
      (error) => {
        console.error('Erreur lors de la récupération du candidat', error);
      }
    );
  }

  // Méthode pour mettre à jour le candidat
  updateCandidat(formData: any): void {
    this.candidatService.updateCandidat(this.candidatId, formData).subscribe(
      (response) => {
        console.log('Candidat mis à jour avec succès!', response);
        // Redirection ou affichage de message de succès
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du candidat', error);
        // Gérer l'erreur ici
      }
    );
  }

  onSubmit(): void {
    // Mettre à jour les informations du candidat lors de la soumission du formulaire
    this.updateCandidat(this.candidat);
  }
}
