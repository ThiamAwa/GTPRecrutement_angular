import { Component } from '@angular/core';
import { MissionServiceService } from '../service/mission-service.service';

@Component({
  selector: 'app-liste-mission-demander',
  templateUrl: './liste-mission-demander.component.html',
  styleUrls: ['./liste-mission-demander.component.css']
})
export class ListeMissionDemanderComponent {
  missions: any[] = [];

  constructor(private missionService: MissionServiceService) { }

  ngOnInit(): void {
    this.missionService.getMissionsSansConsultant().subscribe(
      (data: any[]) => this.missions = data,
      error => console.error('Erreur lors de la récupération des missions:', error)
    );
  }

}
