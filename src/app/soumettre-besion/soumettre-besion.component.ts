import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-soumettre-besion',
  templateUrl: './soumettre-besion.component.html',
  styleUrls: ['./soumettre-besion.component.css']
})
export class SoumettreBesionComponent implements OnInit {
  missionForm!: FormGroup;
  submitted = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.missionForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: [''],
      type_profil_recherche: ['', Validators.required],
      competences_requises: ['', Validators.required],
      niveau_experience: ['', Validators.required],
      duree: [{ value: '', disabled: true }],
      objectifs: ['', Validators.required],
      consultant_id: [0]
    });

    this.missionForm.get('date_debut')?.valueChanges.subscribe(() => this.calculateDuration());
    this.missionForm.get('date_fin')?.valueChanges.subscribe(() => this.calculateDuration());
  }

  get f() { return this.missionForm.controls; }

  calculateDuration(): void {
    const startDate = this.missionForm.get('date_debut')?.value;
    const endDate = this.missionForm.get('date_fin')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let months = (end.getFullYear() - start.getFullYear()) * 12;
      months -= start.getMonth();
      months += end.getMonth();

      this.missionForm.get('duree')?.setValue(months, { emitEvent: false });
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.missionForm.invalid) {
      return;
    }

    const missionData = {
      ...this.missionForm.value,
      date_fin: this.missionForm.value.date_fin || null
    };

    // Récupérer le token
    const token = this.authService.getToken();

    if (!token) {
      console.error('Token manquant, utilisateur non authentifié');
      return;
    }

    // Créer les en-têtes avec le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Soumettre la requête avec le token d'authentification
    this.http.post('http://localhost:8000/api/missions/soumettreBesion', missionData, { headers })
      .subscribe(
        response => {
          console.log('Mission créée avec succès', response);
          this.router.navigate(['/ConsulteMission']);
        },
        error => {
          console.error('Erreur lors de la création de la mission', error);
        }
      );
  }
}
