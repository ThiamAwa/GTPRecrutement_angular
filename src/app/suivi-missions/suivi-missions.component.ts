import { Component } from '@angular/core';
import { MissionServiceService } from '../service/mission-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suivi-missions',
  templateUrl: './suivi-missions.component.html',
  styleUrls: ['./suivi-missions.component.css']
})
export class SuiviMissionsComponent {
  missions: any[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private missionService: MissionServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadOngoingMissions();
  }

  loadOngoingMissions(): void {
    this.isLoading = true; // Show loading spinner
    this.missionService.getOngoingMissions().subscribe(
      data => {
        this.missions = data;
        this.isLoading = false; // Hide spinner
        this.errorMessage = null; // Reset error message
      },
      error => {
        console.error('Erreur lors du chargement des missions en cours', error);
        this.isLoading = false;
        this.errorMessage = 'Une erreur est survenue lors du chargement des missions.';
      }
    );
  }

  updateStatus(missionId: number, newStatus: string): void {
    this.missionService.updateMissionStatus(missionId, newStatus).subscribe(
      () => {
        this.loadOngoingMissions(); // Reload the list after the update
        this.errorMessage = null;
      },
      error => {
        console.error('Erreur lors de la mise à jour du statut', error);
        this.errorMessage = 'Erreur lors de la mise à jour du statut.';
      }
    );
  }
}

