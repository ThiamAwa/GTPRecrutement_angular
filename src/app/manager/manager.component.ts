import { Component, OnInit } from '@angular/core';
import { Candidat } from '../model/candidat';
import { CandidatServiceService } from '../service/candidat-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
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

  constructor(
    private httpClient: HttpClient,
    private candidatService: CandidatServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCandidats();
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
          // Ajouter du code pour afficher un bouton "Supprimer" si nécessaire
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
          // Ajouter du code pour afficher un bouton "Supprimer" si nécessaire
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
          // Mettre à jour l'affichage ou gérer la réponse
          console.log(response);
          this.getAllCandidats // Recharger la liste des candidats
        },
        error => {
          console.error('Erreur lors de l\'acceptation du candidat', error);
        }
      );
  }

}
