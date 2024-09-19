import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-mission',
  templateUrl: './detail-mission.component.html',
  styleUrls: ['./detail-mission.component.css']
})
export class DetailMissionComponent implements OnInit {
  selectedMission: any;  // Define selectedMission
  notifications: any[] = [];  // Define notifications as an array

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // You might need to fetch the data here based on the route parameters
    const missionId = this.route.snapshot.paramMap.get('id');
    // Fetch mission details using missionId, e.g., from a service
    // this.selectedMission = fetchedMissionDetails;

    // Initialize notifications if needed
    // this.notifications = fetchedNotifications;
  }

  showDetails(index: number): void {
    this.selectedMission = this.notifications[index];
  }
}
