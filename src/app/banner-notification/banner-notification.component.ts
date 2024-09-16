import { Component } from '@angular/core';
import { NotificationServiceService } from '../service/notification-service.service';

@Component({
  selector: 'app-banner-notification',
  templateUrl: './banner-notification.component.html',
  styleUrls: ['./banner-notification.component.css']
})
export class BannerNotificationComponent {

  notifications: any[] = [];

  constructor(private notificationService: NotificationServiceService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getUnreadNotifications().subscribe(
      (data: any) => {
        this.notifications = data.notifications; // Adaptez selon la structure de la réponse
      },
      error => {
        console.error('Erreur lors de la récupération des notifications', error);
      }
    );
  }

  markAsRead(): void {
    this.notificationService.markNotificationsAsRead().subscribe(
      () => {
        // Actualiser les notifications après les avoir marquées comme lues
        this.loadNotifications();
      },
      error => {
        console.error('Erreur lors de la mise à jour des notifications', error);
      }
    );
  }
}


