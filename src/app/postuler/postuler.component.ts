import { Component, OnInit } from '@angular/core';
import { CandidatServiceService } from '../service/candidat-service.service';
import { AuthServiceService } from '../service/auth-service.service';
import { OffreServiceService } from '../service/offre-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrls: ['./postuler.component.css']
})
export class PostulerComponent implements OnInit {
  offreId: number | null = null;  // ID de l'offre récupéré depuis la route
  offreTitle: string = '';  // Titre de l'offre
  user: any = {};  // Informations de l'utilisateur connecté
  candidat: any = {
    adresse: '',
    telephone: '',
    date_de_naissance: '',
    competences: '',
    experience: '',
    offre_id: null,  // Associe l'offre à la candidature
  };
  selectedFiles: { cv?: File, lm?: File } = {};  // Fichiers sélectionnés (CV, Lettre de motivation)

  constructor(
    private authService: AuthServiceService,
    private candidatService: CandidatServiceService,
    private offreService: OffreServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'offre à partir des paramètres de la route
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id) {
        this.offreId = +id;
        this.candidat.offre_id = this.offreId;  // Associer l'ID de l'offre au candidat

        // Récupérer les détails de l'offre via l'ID
        this.offreService.getOffreById(this.offreId).subscribe(
          (data) => {
            this.offreTitle = data.titre;  // Mettre à jour le titre de l'offre
          },
          (error) => {
            console.error('Erreur lors de la récupération de l\'offre', error);
          }
        );
      } else {
        console.error('L\'ID de l\'offre est manquant dans les paramètres de la route.');
      }
    });

    // Récupérer les informations de l'utilisateur connecté
    this.authService.getUser().subscribe(user => {
      this.user = user;
    }, error => {
      console.error('Erreur lors de la récupération de l\'utilisateur', error);
    });
  }

  // Méthode pour gérer la soumission du formulaire
  onSubmit() {
    const candidatData = {
        adresse: this.candidat.adresse,
        telephone: this.candidat.telephone,
        date_de_naissance: this.candidat.date_de_naissance,
        competences: this.candidat.competences,
        experience: this.candidat.experience,
        user_id: this.user.id,
        offre_id: this.candidat.offre_id
    };

    // Create a FormData object to include CV and cover letter files
    const formData = new FormData();
    formData.append('candidat', JSON.stringify(candidatData));

    if (this.selectedFiles.cv) {
        formData.append('cv', this.selectedFiles.cv);
    }
    if (this.selectedFiles.lm) {
        formData.append('lm', this.selectedFiles.lm);
    }

    // Retrieve the token from the AuthService
    const token = this.authService.getToken(); // Assurez-vous d'avoir une méthode pour récupérer le token

    // Create headers with the token
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    // Send the application via the service with headers
    this.candidatService.createCandidat(formData, { headers }).subscribe(
        response => {
            console.log('Candidature soumise avec succès', response);
            // Redirect user after submission (optional)
            this.router.navigate(['/confirmation']);  // Remplacez '/confirmation' par la route souhaitée
        },
        error => {
            console.error('Erreur lors de la soumission de la candidature', error);
        }
    );
  }

  // Méthode pour gérer le changement de fichier (CV ou Lettre de motivation)
  onFileChange(event: any, fileType: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (fileType === 'cv') {
        this.selectedFiles.cv = file;
      } else if (fileType === 'lm') {
        this.selectedFiles.lm = file;
      }
    }
  }
}
