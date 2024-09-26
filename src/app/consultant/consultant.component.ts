import { Component } from '@angular/core';
import { Consultant } from '../model/consultant';
import { ConsultantServiceService } from '../service/consultant-service.service';
import { MissionServiceService } from '../service/mission-service.service';


@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent {
  namelogo: string = 'assets/img/logo.png';
  face1: string = 'assets/img/face1.jpg';
  tabConsultant: Consultant[] = [];
  filters = { competences: '', experiences: '', date_disponibilite: '' };

  showMissionModal = false;
  isConfirmationModalOpen = false;
  selectedMission: number | null = null;
  selectedConsultantId: number | null = null;
  selectedClientId: number | null = null;
  missionList: any[] = [];
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
    this.getMissions();
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

  fetchMissionsSansConsultant(): void {
    this.missionService.getMissionsSansConsultant().subscribe(
      (data) => {
        this.missionList = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des missions sans consultant', error);
      }
    );
  }

  openModal(consultantId: number) {
    this.selectedConsultantId = consultantId;
    this.isModalOpen = true;
    this.fetchMissionsSansConsultant();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getFilteredConsultant(): void {
    this.consultantService.getFilteredConsultants(this.filters).subscribe((data: Consultant[]) => {
      this.tabConsultant = data;
    });
  }

  onFilterChange(): void {
    this.getFilteredConsultant();
  }

  openConfirmationModal() {
    this.isConfirmationModalOpen = true;
  }

  closeConfirmationModal() {
    this.isConfirmationModalOpen = false;
  }

  getMissionTitle(missionId: number): string {
    const mission = this.missionList.find(m => m.id === missionId);
    return mission ? mission.title : 'Mission inconnue';
  }

  getConsultantName(consultantId: number | null): string {
    if (consultantId === null) {
      return 'Consultant non sélectionné';
    }
    const consultant = this.tabConsultant.find(c => c.id === consultantId);
    return consultant ? consultant.user.name : 'Consultant inconnu';
  }

  assignMission() {
    console.log('Mission sélectionnée:', this.selectedMission);
    console.log('Consultant sélectionné ID:', this.selectedConsultantId);
  
    if (this.selectedMission && this.selectedConsultantId) {
      const mission = this.missionList.find(m => m.id === this.selectedMission); // Récupérer l'objet de mission
      if (mission) {
        const clientId = mission.client_id;
  
        // Vérifiez que clientId et selectedConsultantId sont des numbers
        if (clientId !== null && this.selectedConsultantId !== null) {
          this.missionService.assignMission(mission.id, this.selectedConsultantId, clientId)
            .subscribe({
              next: (response) => {
                console.log('Mission assignée avec succès !', response);
                this.closeModal();
  
                //Envoyer l'email au consultant
                if (this.selectedConsultantId !== null && clientId !== null) {
                  this.missionService.sendEmailToConsultant(this.selectedConsultantId, mission.id, clientId)
                      .subscribe({
                          next: response => {
                              // Handle success
                          },
                          error: error => {
                              console.error('Erreur lors de l\'envoi de l\'email:', error);
                          }
                      });
              } else {
                  console.error('Consultant ID or Client ID is null');
              }
              
              },
              error: (error) => {
                console.error('Erreur lors de l\'attribution de la mission', error);
              }
            });
        } else {
          console.error('Client non associé à la mission');
        }
      } else {
        console.error('Mission non trouvée');
      }
    } else {
      console.error('Mission ou consultant non sélectionné');
    }
  }
  

  onSelectMission(mission: any, consultantId: number) {
    this.selectedMission = mission.id;
    this.isConfirmationModalOpen = true;
    console.log('Mission sélectionnée:', mission);
    console.log('ID du consultant:', consultantId);
  }

  onSelectConsultant(consultantId: number) {
    this.selectedConsultantId = consultantId;
  }
}
