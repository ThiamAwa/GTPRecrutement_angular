import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offre } from '../model/offre';
import { OffreServiceService } from '../service/offre-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  namelogo: string = "assets/img/logo.png";
  namedashboard: string = "assets/img/gtp.png";

  tabOffre: Offre[] = [];

  // Filter model
  filters = {
    lieu: '',
    experience: '',
    type_contrat: '',
    search: ''
  };

  constructor(
    private offreService: OffreServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFilteredOffres(); // Initially fetch offers
  }

  // Fetch offers based on filters
  getFilteredOffres(): void {
    this.offreService.getFilteredOffres(this.filters).subscribe((data: Offre[]) => {
      this.tabOffre = data;
    });
  }

  // Handle user selection of an offer
  onSelectOffre(offre: Offre): void {
    this.router.navigate(['/detail-offre', offre.id]);
  }

  // Trigger when filters change
  onFilterChange(): void {
    this.getFilteredOffres(); 
  }
}
