import { Component, OnInit,Inject  } from '@angular/core';
import { Candidat } from '../model/candidat';
import { CandidatServiceService } from '../service/candidat-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PusherServiceService } from '../service/pusher-service.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NotificationBottomSheetComponent } from '../notification-bottom-sheet/notification-bottom-sheet.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var bootstrap: any;

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  namelogo: string = "assets/img/logo.png";
  face1: string = "assets/img/face1.jpg";
  tabCandidat: Candidat[] = [];
  filters = {
    competences: '',
    experience: '',
    type_contrat: ''
  };
  notifications: any[] = [];
  selectedMission: any = null;

  constructor(
    private httpClient: HttpClient,
    private candidatService: CandidatServiceService,
    private router: Router,
    private pusherService: PusherServiceService,
    private _bottomSheet: MatBottomSheet,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getAllCandidats();
    // Subscribe to notifications from Pusher
    this.pusherService.getNotifications().subscribe((data: any) => {
      // Push the notification to the list
      this.notifications.push(data.mission);
    });
  }

  openBottomSheet(notification?: any): void {
    this._bottomSheet.open(NotificationBottomSheetComponent, {
      data: notification
    });
  }

  openLink(event: MouseEvent): void {
    this._bottomSheet.dismiss();
    event.preventDefault();
  }

  showNotificationModal() {
    const modalElement = document.getElementById('notificationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Méthode pour obtenir tous les candidats
  getAllCandidats(): void {
    this.candidatService.getAllCandidat().subscribe(
      (data: Candidat[]) => {
        this.tabCandidat = data;
        console.log(this.tabCandidat);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  get unreadNotificationsCount() {
    return this.notifications.filter(notification => !notification.read).length;
  }



  showDetails(index: number) {
    // Set the selected mission based on the index clicked
    this.selectedMission = this.notifications[index];
  }

  // Méthode pour filtrer les candidats
  onFilter(): void {
    const filters = {
      competences: this.filters.competences,
      experience: this.filters.experience,
      type_contrat: this.filters.type_contrat
    };

    this.candidatService.getFilterCandidat(filters).subscribe(
      (data: Candidat[]) => {
        this.tabCandidat = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // Accepter un candidat
  accepterCandidat(candidat: Candidat): void {
    if (candidat.id !== undefined) {
      this.candidatService.updateStatus(candidat.id, 'Accepté').subscribe(
        (response: any) => {
          candidat.status = 'Accepté';
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.error('Candidat ID is undefined');
    }
  }

  // Refuser un candidat
  refuserCandidat(candidat: Candidat): void {
    if (candidat.id !== undefined) {
      this.candidatService.updateStatus(candidat.id, 'Refusé').subscribe(
        (response: any) => {
          candidat.status = 'Refusé';
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.error('Candidat ID is undefined');
    }
  }

  // Supprimer un candidat refusé
  supprimerCandidat(candidatId: number): void {
    this.candidatService.deleteCandidat(candidatId).subscribe(
      (response: any) => {
        this.tabCandidat = this.tabCandidat.filter(c => c.id !== candidatId);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  accepterCandidatConsultant(candidat: any) {
    this.httpClient.post(`http://localhost:8000/api/candidat/${candidat.id}/accepter`, {})
      .subscribe(
        response => {
          console.log(response);
          this.getAllCandidats(); // Reload candidate list
        },
        error => {
          console.error('Erreur lors de l\'acceptation du candidat', error);
        }
      );
  }
}
