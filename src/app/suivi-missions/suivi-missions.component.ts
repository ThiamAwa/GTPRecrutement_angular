import { Component } from '@angular/core';
import { MissionServiceService } from '../service/mission-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suivi-missions',
  templateUrl: './suivi-missions.component.html',
  styleUrls: ['./suivi-missions.component.css']
})
export class SuiviMissionsComponent {

  mission = {
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
    status: 'en_attente',
    consultant_id: null,
    client_id: null
  };

  constructor(private missionService: MissionServiceService, private router: Router) {}

  onSubmit() {
    this.missionService.createMission(this.mission).subscribe(response => {
      console.log('Mission created:', response);
      this.router.navigate(['/missions']);
    }, error => {
      console.error('Error creating mission:', error);
    });
  }

}
