// mission.component.ts
import { Component, OnInit } from '@angular/core';
import { MissionServiceService } from '../service/mission-service.service';
import { ClientServiceService } from '../service/client-service.service';
import { ConsultantServiceService } from '../service/consultant-service.service';
import { Mission } from '../model/mission';
import { OffreServiceService } from '../service/offre-service.service';

@Component({
  selector: 'app-missions',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  namelogo: string = "assets/img/logo.png";
  face1: string = "assets/img/face1.jpg";
  missions: any[] = [];
  clients: any[] = [];
  consultants: any[] = [];
  publicationSuccess: boolean = false; 
  isLoading: boolean = false;
  offerPublished: { [key: number]: boolean } = {};

  constructor(
    private missionService: MissionServiceService,
    private clientService: ClientServiceService,
    private consultantService: ConsultantServiceService,
    private offreService: OffreServiceService
  ) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.loadMissions();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des clients:', err);
      }
    });

    // Récupération des consultants
    this.consultantService.getAllConsultant().subscribe({
      next: (data) => {
        this.consultants = data;
        // Les missions seront chargées dans loadMissions après avoir récupéré les consultants
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des consultants:', err);
      }
    });
  }

  loadMissions(): void {
    this.missionService.getMissions().subscribe({
      next: (missions) => {
        this.missions = missions.map(mission => ({
          ...mission,
          consultantName: this.consultants.find(consultant => consultant.id === mission.consultant_id)?.nom + ' ' + this.consultants.find(consultant => consultant.id === mission.consultant_id)?.prenom || 'Inconnu',
          clientName: this.clients.find(client => client.id === mission.client_id)?.user.name  || 'Inconnu'
        }));
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des missions:', err);
      }
    });
  }


  // mission.component.ts
updateMissionStatus(missionId: number, newStatus: string): void {
  const validStatuses = ['en_attente', 'en_cours', 'terminee']; // Valeurs exactes selon la migration

  if (!validStatuses.includes(newStatus)) {
    console.error('Invalid status');
    alert('Le statut sélectionné est invalide.');
    return;
  }

  this.missionService.updateMissionStatus(missionId, newStatus).subscribe({
    next: (response) => {
      console.log('Status updated successfully:', response);
      // Mettre à jour la liste des missions ou afficher un message de succès
    },
    error: (error) => {
      console.error('Error updating status:', error);
      alert(`Erreur lors de la mise à jour du statut: ${error.error.message}`);
    }
  });
}

publier(missionId: number) {
  this.isLoading = true;
  this.offreService.publierOffre(missionId).subscribe(
    response => {
      // Gérer la réponse ici
      console.log(response);
      this.publicationSuccess = true;
      this.offerPublished[missionId] = true;
      // Optionnel : mettre à jour la liste des missions ou afficher un message de succès
    },
    error => {
      // Gérer les erreurs ici
      console.error('Erreur lors de la publication de l\'offre', error);
    }
  );
}

}
