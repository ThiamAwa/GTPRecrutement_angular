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

  constructor(
    private httpClient: HttpClient,
    private candidatService: CandidatServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCandidats();
  }
  getAllCandidats(): void {
    this.candidatService.getAllCandidat().subscribe((data: Candidat[]) => {
      this.tabCandidat = data;
      console.log(this.tabCandidat)
    },
    (error:any)=>{
      console.log(error);
    }
  )
  }
}
