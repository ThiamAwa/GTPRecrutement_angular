import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MissionServiceService {
  private apiUrl = 'http://localhost:8000/api/missions';
  private apiUrl2='http://localhost:8000/api/missions/sans-consultant';
  private clientId: number = 2;

  constructor(private http: HttpClient) {
   // Récupérer le clientId lors de l'initialisation du service
  }

  // Récupère toutes les missions
  getMissions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // Crée une nouvelle mission
  createMission(mission: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mission).pipe(catchError(this.handleError));
  }

  // Met à jour une mission existante
  updateMission(id: number, mission: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, mission).pipe(catchError(this.handleError));
  }

  // Supprime une mission
  deleteMission(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Met à jour l'état d'une mission
  updateMissionStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status }).pipe(catchError(this.handleError));
  }

  // Récupère toutes les missions en cours
  getOngoingMissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ongoing`).pipe(catchError(this.handleError));
  }

  // Récupère les détails d'une mission spécifique
  getMissionDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Récupère les statistiques des missions
  getMissionStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics`).pipe(catchError(this.handleError));
  }

  // Récupère les missions pour un client spécifique
  getMissionsForClient(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/api/missions/client/${clientId}`).pipe(catchError(this.handleError));
  }

  // Affiche les missions pour un client spécifique
  getMissionShowClient(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/showClient/${id}`).pipe(catchError(this.handleError));
  }

  // Soumet un besoin
  soumettreBesion(mission: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/soumettreBesion`, mission).pipe(catchError(this.handleError));
  }

  // Récupère l'ID du client depuis le localStorage
  getClientId(): number | null {
    const clientId = localStorage.getItem('1');
    return clientId ? parseInt(clientId, 10) : null;
  }

  // Gère les erreurs d'API
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Une erreur est survenue:', error);
    return throwError(() => new Error('Une erreur est survenue. Veuillez réessayer plus tard.'));
  }
  // getMissionsOverview(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/missions/overview`);
  // }

  getMissionsSansConsultant(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des missions sans consultant:', error);
        return throwError(() => new Error('Une erreur est survenue. Veuillez réessayer plus tard.'));
      })
    );
  
  }
}
