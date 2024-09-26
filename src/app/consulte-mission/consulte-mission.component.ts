import { Component, OnInit } from '@angular/core';
import { MissionServiceService } from '../service/mission-service.service';
import { Mission } from '../model/mission';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../service/feedback.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-consulte-mission',
  templateUrl: './consulte-mission.component.html',
  styleUrls: ['./consulte-mission.component.css']
})
export class ConsulteMissionComponent implements OnInit {
  missions: any[] = [];
  missionDetails: any;
  clientId: number = 1;
  filteredMissions: Mission[] = [];

  selectedStatus: string = '';
  startDate: string = '';
  endDate: string = '';
  isModalOpen: boolean = false;
  termineMissions: any[] = [];
  missionValidee: boolean = false;
  feedback = {
    rating: null,
    collaboration: '',
    delais: '',
    commentaire: ''
  };
  missionId: number | null = null; // Initialisation avec null
  consultantId: number | null = null;

  private apiUrl3 = 'http://localhost:8000/api/missionsOngoing';

  constructor(private missionService: MissionServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    // this.getMissions();
    this.getOngoingMissions();
    // this.checkMissionStatus();
    const missionId = this.route.snapshot.paramMap.get('id');
    if (missionId) {
      this.getMissionDetails(+missionId);
    }
    this.getTermineMissions();
  }

  checkMissionStatus(): void {
    this.missionService.checkAndUpdateMissionStatus().subscribe(
      response => {
        console.log(response.message);
        this.getMissions();
      },
      error => {
        console.error('Erreur lors de la mise à jour des statuts', error);
      }
    );
  }

  filterMissions() {
    this.filteredMissions = this.missions.filter(mission => {
      // Filter by status
      const statusMatch = this.selectedStatus ? mission.status === this.selectedStatus : true;

      // Filter by start date
      const startDateMatch = this.startDate ? new Date(mission.date_debut) >= new Date(this.startDate) : true;

      // Filter by end date
      const endDateMatch = this.endDate ? new Date(mission.date_fin) <= new Date(this.endDate) : true;

      return statusMatch && startDateMatch && endDateMatch;
    });
  }

  // Retrieve ongoing missions
  getOngoingMissions(): void {
    this.missionService.getOngoingMissions().subscribe(
      (data: any[]) => {
        this.missions = data;
        console.log('Missions retrieved:', this.missions);
      },
      (error) => {
        console.error('Erreur lors de la récupération des missions', error);
      }
    );
  }

  getMissionDetails(id: number): void {
    this.missionService.getMissionShowClient(id).subscribe(
      (data: Mission) => {
        this.missionDetails = data; // Stocker les détails de la mission sélectionnée
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la mission', error);
      }
    );
  }



  getMissions(): void {
    this.missionService.getMissionsForClient(this.clientId).subscribe(
      (data) => {
        this.missions = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des missions:', error);
      }
    );
  }

  // Retrieve details of a mission




   // Méthode pour récupérer les détails de la mission
   openModal(clientId: number, missionId: number) {
    this.getMissionDetailsEncours(clientId, missionId);
    this.isModalOpen = true;
}

getMissionDetailsEncours(clientId: number, missionId: number) {
  this.missionService.getMissionDetailsMissionEncours(clientId, missionId).subscribe(
      (data) => {
          this.missionDetails = data; // Stocker les détails de la mission
      },
      (error) => {
          console.error('Erreur lors de la récupération des détails de la mission:', error);
          // this.errorMessage = 'Une erreur est survenue lors de la récupération des détails de la mission. Veuillez réessayer plus tard.';
      }
  );
}

getRemainingDays(dateFin: string): number {
  const endDate = new Date(dateFin);
  const today = new Date();
  const timeDiff = endDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}


  closeModal() {
    this.isModalOpen = false; // Fermer la modale
  }

  getTermineMissions(): void {
    this.missionService.getTermineMissions().subscribe(
      (data) => {
        this.termineMissions = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des missions terminées', error);
      }
    );
  }

  validerMission(missionId: number) {
    this.missionService.validerMission(missionId).subscribe(
      response => {
        console.log('Mission validée avec succès', response);
        // alert('Mission validée. Les emails ont été envoyés.');
        this.missionValidee = true;
      },
      error => {
        console.error('Erreur lors de la validation de la mission', error);
      }
    );
  }

  openFeedbackModal(missionId: number, consultantId: number) {
    this.missionId = missionId;
    this.consultantId = consultantId;
    console.log('bonjour');
    this.isModalOpen = true;
    console.log(missionId);
    console.log(consultantId)

    // Ouvrir le modal ici
  }

  closeModalFeedback() {
    this.isModalOpen = false;
  }

  submitFeedback(feedbackForm: NgForm) {
    if (feedbackForm.valid) {
        const feedbackData = {
            ...feedbackForm.value,
            mission_id: this.missionId!,
            consultant_id: this.consultantId!
        };

        this.feedbackService.submitFeedback(feedbackData).subscribe(
            response => {
                console.log("Feedback soumis avec succès");
                // Fermez le modal et réinitialisez le formulaire ici si nécessaire
            },
            error => {
                console.error("Erreur lors de la soumission du feedback", error);
            }
        );
    } else {
        console.error("Le formulaire est invalide");
    }
}



}
