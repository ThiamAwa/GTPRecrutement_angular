import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MissionServiceService } from '../service/mission-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-soumettre-besion',
  templateUrl: './soumettre-besion.component.html',
  styleUrls: ['./soumettre-besion.component.css']
})
export class SoumettreBesionComponent implements OnInit {
  missionForm!: FormGroup;
  clients: any[] = [];
  consultants: any[] = [];
  clientId!: number;

  constructor(
    private http: HttpClient,
    private missionService: MissionServiceService,
    private fb: FormBuilder,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.clientId = this.missionService.getClientId() ?? 0; // Assurez-vous d'avoir une valeur valide

    this.missionForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: [''],
      client_id: 1,
      consultant_id: 0
    });
  }

  onSubmit(): void {
    if (this.missionForm.valid) {
      const missionData = {
        titre: this.missionForm.value.titre,
        description: this.missionForm.value.description,
        date_debut: this.missionForm.value.date_debut,
        date_fin: this.missionForm.value.date_fin || null,
        client_id: this.missionForm.value.client_id,
        // Ne pas inclure consultant_id si sa valeur est null
        ...(this.missionForm.value.consultant_id !== 0 && { consultant_id: this.missionForm.value.consultant_id })
      };

      this.http.post('http://localhost:8000/api/missions/soumettreBesion', missionData)
        .subscribe(response => {
          this.router.navigate(['/ConsulteMission']);
          console.log('Mission créée avec succès', response);
        }, error => {
          console.error('Erreur lors de la création de la mission', error);
        });
    }
  }
}
