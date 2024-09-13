import { Component } from '@angular/core';
import { MissionServiceService } from '../service/mission-service.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  missionsEnCours: any[] = [];
  demandesRecientes: any[] = [];
  missionsTerminees: any[] = [];

  constructor(private missionService:MissionServiceService) { }

  ngOnInit(): void {
    // this.missionService.getMissionsOverview().subscribe(data => {
    //   this.missionsEnCours = data.missionsEnCours;
    //   this.demandesRecientes = data.demandesRecientes;
    //   this.missionsTerminees = data.missionsTerminees;
    // });
  }

}
