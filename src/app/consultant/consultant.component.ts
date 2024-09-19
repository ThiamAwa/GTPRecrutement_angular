import { Component } from '@angular/core';
import { Consultant } from '../model/consultant';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConsultantServiceService } from '../service/consultant-service.service';
import { MissionServiceService } from '../service/mission-service.service';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent {
  namelogo: string = "assets/img/logo.png";
  face1: string = "assets/img/face1.jpg";
  tabConsultant: Consultant[] = [];
  filters = { competences: '', experiences: '', date_disponibilite: '' };

  showMissionModal = false;
  selectedConsultantId: number | null = null;
  selectedMission: any;
  missionList :any[] = [];
  isModalOpen = false;

  constructor(
    private consultantService: ConsultantServiceService,
    private missionService: MissionServiceService,
  ) {}

  ngOnInit(): void {
    this.getAllConsultants();
  }

  getAllConsultants(): void {
    this.consultantService.getAllConsultant().subscribe(
      (data: Consultant[]) => {
        this.tabConsultant = data;
        console.log(this.tabConsultant);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  openAssignMissionModal(consultantId: number) {
    this.selectedConsultantId = consultantId;
    this.showMissionModal = true;
    this.getMissions(); // Récupère les missions disponibles
  }

  closeMissionModal() {
    this.showMissionModal = false;
  }

  getMissions(): void {
    this.missionService.getMissions().subscribe(
      (missions: any[]) => {
        this.missionList = missions;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des missions', error);
      }
    );
  }

  // assignMission() {
  //   if (this.selectedConsultantId && this.selectedMission) {
  //     const data = {
  //       consultantId: this.selectedConsultantId,
  //       missionId: this.selectedMission
  //     };

  //     this.missionService.assignConsultantToMission(data).subscribe(response => {
  //       console.log('Consultant assigné avec succès', response);
  //       this.closeMissionModal(); // Ferme la modale après l'attribution
  //       this.getAllConsultants(); // Recharge la liste des consultants
  //     }, error => {
  //       console.log('Erreur lors de l\'attribution', error);
  //     });
  //   } else {
  //     console.error('Consultant ou mission non sélectionnés');
  //   }
  // }

  openModal(consultantId: number) {
    this.selectedConsultantId = consultantId;
    this.isModalOpen = true;
    this.getMissions();
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedConsultantId = null;
  }

  getFilteredConsultant(): void {
    this.consultantService.getFilteredConsultans(this.filters).subscribe((data: Consultant[]) => {
      this.tabConsultant = data;
    });
  }

  onFilterChange(): void {
    this.getFilteredConsultant();
  }

}
