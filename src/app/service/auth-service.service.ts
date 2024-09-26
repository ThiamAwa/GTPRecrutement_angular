import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://127.0.0.1:8000/api/login';
  private apiUrl1 = 'http://127.0.0.1:8000/api/logout';
  private apiUrl2 = 'http://127.0.0.1:8000/api/user';
  private apiUrl3 = 'http://127.0.0.1:8000/api/register';

  constructor(private http: HttpClient) { }

  // Récupère le jeton d'authentification depuis localStorage
  getToken(): string {
    const token = localStorage.getItem('authToken');
    console.log('Jeton récupéré:', token);
    return token || '';
  }

  // Fonction de connexion
  login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, credentials, { headers }).pipe(
      tap(response => {
        console.log('Réponse de connexion:', response);

        // Stockage du jeton d'accès
        if (response.access_token) {
          localStorage.setItem('authToken', response.access_token);
        } else {
          console.error('Jeton manquant dans la réponse');
        }

        // Stockage de l'ID client
        if (response.user && response.user.client) {
          localStorage.setItem('clientId', response.user.client.id.toString());
        } else {
          console.error('clientId manquant dans la réponse');
        }

        // Stockage de l'ID consultant
        if (response.user && response.user.consultant) {
          localStorage.setItem('consultantId', response.user.consultant.id.toString());
        } else {
          console.error('consultantId manquant dans la réponse');
        }
      }),
      catchError(error => {
        console.error('Erreur de connexion', error);
        return throwError(error);
      })
    );
  }

  // Fonction de déconnexion
  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });
    console.log('Jeton utilisé pour la déconnexion:', this.getToken());

    return this.http.post<any>(this.apiUrl1, {}, { headers });
  }

  // Récupère l'ID client stocké
  getClientId(): number | null {
    const clientId = localStorage.getItem('clientId');
    return clientId ? parseInt(clientId, 10) : null;
  }

  // Récupère l'ID consultant stocké
  getConsultantId(): number | null {
    const consultantId = localStorage.getItem('consultantId');
    return consultantId ? parseInt(consultantId, 10) : null;
  }

  // Récupère les informations de l'utilisateur
  getUserInfo(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl2, { headers });
  }

  // Fonction d'inscription
  register(userData: { name: string, email: string, password: string, confirmPassword: string }): Observable<any> {
    return this.http.post(this.apiUrl3, {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.confirmPassword
    });
  }

  getCandidatId(): number {
    // Si l'ID du candidat est stocké localement après la connexion
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id || null;
  }

  getUser(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get(`${this.apiUrl2}/me`, { headers });
  }
}
