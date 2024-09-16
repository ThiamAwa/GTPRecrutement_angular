import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  private apiUrl = 'http://localhost:8000/api/notifications';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Récupère le jeton d'authentification du stockage local
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUnreadNotifications(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/unread`, { headers: this.getHeaders() });
  }

  markNotificationsAsRead(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/read`, {}, { headers: this.getHeaders() });
  }
}
