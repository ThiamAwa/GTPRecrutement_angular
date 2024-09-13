import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Offre } from '../model/offre';
import { OffreServiceService } from '../service/offre-service.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit{

  tabOffre: Offre[] = [];

  constructor(
    private httpClient: HttpClient,
    private OffreService:OffreServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.OffreService.getOffres().subscribe(data => {
      this.tabOffre = data;
    });
  }



}
