import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatServiceService } from '../service/candidat-service.service';
import { OffreServiceService } from '../service/offre-service.service';
import { Offre } from '../model/offre';

@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrls: ['./postuler.component.css']
})
export class PostulerComponent implements OnInit {
  offreId: number | null = null;
  offreTitle: string = '';

  candidat = {
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    telephone: '',
    status: 'En attente',
    experience: '',
    competences: '',
    date_de_naissance: '',
    lm: null as File | null,
    cv: null as File | null,
    date_de_candidature: new Date().toISOString().split('T')[0],
    offre_id: this.offreId
  };

  constructor(
    private route: ActivatedRoute,
    private candidatService: CandidatServiceService,
    private router: Router,
    private offreService:OffreServiceService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id) {
        this.offreId = +id;
        this.candidat.offre_id = this.offreId; // Mettre à jour l'ID de l'offre

        this.offreService.getOffreById(this.offreId).subscribe(
          (data) => {
            this.offreTitle = data.titre;
          },
          (error) => {
            console.error('Erreur lors de la récupération de l\'offre', error);
          }
        );
      } else {
        console.error('L\'ID de l\'offre est manquant dans les paramètres de la route.');
      }
    });
  }


  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      if (field === 'cv') {
        this.candidat.cv = file;
      } else if (field === 'lm') {
        this.candidat.lm = file;
      }
    }
  }

  resetForm() {
    this.candidat = {
      nom: '',
      prenom: '',
      email: '',
      adresse: '',
      telephone: '',
      status: '',
      experience: '',
      competences: '',
      date_de_naissance: '',
      date_de_candidature: '',
      lm: null,
      cv: null,
      offre_id: this.offreId
    };

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit() {
    const formData: FormData = new FormData();
    formData.append('nom', this.candidat.nom || '');
    formData.append('prenom', this.candidat.prenom || '');
    formData.append('email', this.candidat.email || '');
    formData.append('adresse', this.candidat.adresse || '');
    formData.append('telephone', this.candidat.telephone || '');
    formData.append('status', this.candidat.status || 'En attente');
    formData.append('experience', this.candidat.experience || '');
    formData.append('competences', this.candidat.competences || '');
    formData.append('date_de_naissance', this.candidat.date_de_naissance || '');
    formData.append('date_de_candidature', this.candidat.date_de_candidature || '');
    formData.append('offre_id', this.candidat.offre_id?.toString() || '');


    if (this.candidat.cv) {
      formData.append('cv', this.candidat.cv, this.candidat.cv.name);
    }
    if (this.candidat.lm) {
      formData.append('lm', this.candidat.lm, this.candidat.lm.name);
    }

    this.candidatService.createCandidat(formData).subscribe(
      response => {
        console.log('Candidat created successfully:', response);
        this.router.navigate(['/dashboard']);
        this.resetForm();
      },
      error => {
        console.error('Error creating candidat:', error);
        if (error.error && error.error.errors) {
          // Affiche les erreurs spécifiques retournées par le backend
          for (const [key, value] of Object.entries(error.error.errors)) {
            console.error(`${key}: ${value}`);
          }
        } else {
          alert('Error creating candidat: ' + (error.error?.message || error.message));
        }
      }
    );
  }
}
