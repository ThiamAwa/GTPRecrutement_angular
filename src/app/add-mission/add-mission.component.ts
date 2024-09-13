// add-mission.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MissionServiceService } from '../service/mission-service.service';
import { ClientServiceService } from '../service/client-service.service';
import { ConsultantServiceService } from '../service/consultant-service.service';
@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})
export class AddMissionComponent {
  clients: any[] = [];
  consultants: any[] = []; // Array to hold consultants
  namelogo: string = "assets/img/logo.png";
  face1: string = "assets/img/face1.jpg";
  missionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private missionService: MissionServiceService,
    private router: Router,
    private clientService: ClientServiceService,
    private consultantService: ConsultantServiceService // Add this service
  ) {
    this.missionForm = this.fb.group({
      titre: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: [''],
      client_id: [0, [Validators.required]],
      consultant_id: [null, [Validators.required]] // Add this field
    });
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des clients:', err);
        alert('Erreur lors de la récupération des clients');
      }
    });

    this.consultantService.getAllConsultant().subscribe({
      next: (data) => {
        this.consultants = data; // Load consultants
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des consultants:', err);
        alert('Erreur lors de la récupération des consultants');
      }
    });
  }

  onSubmit(): void {
    if (this.missionForm.valid) {
        console.log('Form Data:', this.missionForm.value);  // Debugging line
        this.missionService.createMission(this.missionForm.value).subscribe(
            () => {
                this.missionForm.reset();  // Reset the form
                this.router.navigate(['/mission']);
            },
            (error) => {
                console.error('Erreur lors de l\'ajout de la mission', error);
                alert('Erreur lors de l\'ajout de la mission');
            }
        );
    }
  }
}
