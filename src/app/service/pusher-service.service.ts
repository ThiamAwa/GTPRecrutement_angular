import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PusherServiceService {

  private pusher: Pusher;
  private channel: any;
  private notificationSubject = new Subject<any>();

  constructor() {
    this.pusher = new Pusher('16e226762e77412148f6', {
      cluster: 'eu',
      // logToConsole: true,
    });
    this.channel = this.pusher.subscribe('missions');
    this.initializeNotifications();
  }

  private initializeNotifications() {
    this.channel.bind('mission.submitted', (data: any) => {
      console.log('Notification reçue:', data);  // Ajouter ce log
      this.notificationSubject.next(data);
    });
  }

  getNotifications(): Observable<any> {
    return this.notificationSubject.asObservable();
  }
}
