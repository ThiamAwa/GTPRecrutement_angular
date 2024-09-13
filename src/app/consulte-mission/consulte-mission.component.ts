import { Component } from '@angular/core';
import { MissionServiceService } from '../service/mission-service.service';
import { Mission } from '../model/mission';

@Component({
  selector: 'app-consulte-mission',
  templateUrl: './consulte-mission.component.html',
  styleUrls: ['./consulte-mission.component.css']
})
export class ConsulteMissionComponent {
  missions: any[] = [];
  missionDetails: any;
  clientId: number = 1; 
  filteredMissions: Mission[] = [];

  selectedStatus: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private missionService: MissionServiceService) {}

  ngOnInit(): void {
    this.getMissions();
    this.filteredMissions = this.missions;
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
  // Récupérer toutes les missions en cours
  

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

  // Récupérer les détails d'une mission
  getMissionDetails(id: number): void {
    this.missionService.getMissionShowClient(id).subscribe(data => {
      this.missionDetails = data;
    });
  }
  validerMission(missionId: number) {
    // // Logique pour valider la mission
    // this.missionService.validerMission(missionId).subscribe(response => {
    //   console.log('Mission validée', response);
    //   // Rafraîchir la liste des missions si nécessaire
    // }, error => {
    //   console.error('Erreur lors de la validation de la mission', error);
    // });
  }

}
