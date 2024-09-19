import { Component, OnInit } from '@angular/core';
import { PusherServiceService } from '../service/pusher-service.service';

@Component({
  selector: 'app-banner-notification',
  templateUrl: './banner-notification.component.html',
  styleUrls: ['./banner-notification.component.css']
})
export class BannerNotificationComponent implements OnInit {

  notifications: any[] = [];

  constructor(private pusherService: PusherServiceService) {}

  ngOnInit(): void {
    this.pusherService.getNotifications().subscribe((data: any) => {
      // Ajouter la mission à la liste des notifications
      this.notifications.push(data.mission);
      // Afficher un modal ou une alerte
      this.showNotificationModal(data.mission);
    });
  }

  showNotificationModal(mission: any) {
    // alert(`Nouvelle mission soumise: ${mission.title}`);
  }
}
