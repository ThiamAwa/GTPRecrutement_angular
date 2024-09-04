import { Component } from '@angular/core';
import { Candidat } from '../model/candidat';
import { CandidatServiceService } from '../service/candidat-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrls: ['./postuler.component.css']
})
export class PostulerComponent {
  candidat = {
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    telephone:'',
    status:'En attend',
    date_de_naissance: '',
    lm:  null as File | null,
    cv: null as File | null,
    date_de_candidature: new Date().toISOString().split('T')[0]
  };

  constructor(
    private httpClient: HttpClient,
    private candidatService: CandidatServiceService,
    private router: Router
  ) {}

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
      telephone:'',
      status:'',
      date_de_naissance: '',
      date_de_candidature:'',
      lm: null,
      cv: null
    }

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit() {
    
      const formData: FormData = new FormData();
      formData.append('nom', this.candidat.nom);
      formData.append('prenom', this.candidat.prenom);
      formData.append('email', this.candidat.email);
      formData.append('adresse', this.candidat.adresse);
      formData.append('date_de_naissance', this.candidat.date_de_naissance);
      formData.append('telephone', this.candidat.telephone);
      formData.append('status', this.candidat.status);
      formData.append('date_de_candidature', this.candidat.date_de_candidature);

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
          alert('Error creating candidat: ' + error.error.message);
        }
      );
   
  }
  

}
