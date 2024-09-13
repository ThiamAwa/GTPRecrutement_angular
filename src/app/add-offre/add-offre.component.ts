import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Offre } from '../model/offre';
import { OffreServiceService } from '../service/offre-service.service';
import { ClientServiceService } from '../service/client-service.service';


@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent implements OnInit {
  clients: any[] = [];
  offre = {
    titre: '',
    description: '',
    competences: '',
    experience: null,
    lieu: '',
    type_contrat: '',
    date_debut: '',
    client_id: null
  };

  constructor(
    private httpClient: HttpClient,
    private OffreService:OffreServiceService,
    private router: Router,
    private clientService:ClientServiceService,
  ) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des clients:', err);
      }
    });
  }

  submitForm(): void {
    this.OffreService.addOffre(this.offre).subscribe(response => {
      console.log('offre created successfully:', response);
          this.router.navigate(['/offre']);

    });
  }
}











