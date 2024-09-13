import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { OffreServiceService } from '../service/offre-service.service';
import { Offre } from '../model/offre';

@Component({
  selector: 'app-detail-offre',
  templateUrl: './detail-offre.component.html',
  styleUrls: ['./detail-offre.component.css']
})
export class DetailOffreComponent implements OnInit {
  offre!: Offre;

  

  constructor(
    public activatedRoute: ActivatedRoute,
    private offreService:OffreServiceService,
    private router: Router

  ) {}
    ngOnInit(): void {
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      console.log('ID récupéré depuis l\'URL:', id);
      if (id) {
        this.getOffreById(id);
      }
    }


    getOffreById(id: number): void {
      this.offreService.getOffreById(id).subscribe(
        (offre) => {
          console.log('Détails de l\'offre récupérés:', offre);
          this.offre = offre;
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails de l\'offre:', error);
        }
      );
    }

  postuler(offreId: number) {
    if (offreId) {
      this.router.navigate(['/postuler', offreId]);
    } else {
      console.error('ID de l\'offre manquant');
    }
  }

}

