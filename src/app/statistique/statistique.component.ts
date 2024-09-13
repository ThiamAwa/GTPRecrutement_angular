import { Component } from '@angular/core';
import { MissionServiceService } from '../service/mission-service.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent {
  statistics: any = { en_attente: 0, en_cours: 0, terminee: 0 };


  constructor(private missionService: MissionServiceService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.missionService.getMissionStatistics().subscribe(
      data => {
        console.log('Mission statistics received:', data); // Add this line
        this.statistics = data;
      },
      error => {
        console.error('Error fetching mission statistics', error);
      }
    );
  }


}
