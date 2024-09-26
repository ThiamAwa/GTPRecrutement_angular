import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class MissionServiceService {
  private apiUrl = 'http://localhost:8000/api/missions';
  private apiUrl2 = 'http://localhost:8000/api/mission';
  private baseUrl = 'http://localhost:8000/api';
  private apiUrl3='http://localhost:8000/api/missionsOngoing';

  private clientId: number = 2;

  constructor(private http: HttpClient, private authService: AuthServiceService) {
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

  getMissionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Met à jour l'état d'une mission
  updateMissionStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status }).pipe(catchError(this.handleError));
  }

  // Récupère toutes les missions en cours
  getOngoingMissions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl3).pipe(catchError(this.handleError));
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
  soumettreBesion(mission: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/soumettreBesion`, mission, { headers }).pipe(catchError(this.handleError));
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




  // Assigner un consultant à une mission


  assignMission(missionId: number, consultantId: number,clientId:number): Observable<any> {
    return this.http.put(`${this.baseUrl}/missions/${missionId}/assign-consultant`, { consultant_id: consultantId,mission_id:missionId,client_id:clientId});
  }

  // Envoi d'email au consultant
  sendEmailToConsultant(consultantId: number, missionId: number, clientId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-email-to-consultant`, { consultant_id: consultantId,mission_id: missionId,client_id: clientId });
  }

  getMissionsSansConsultant(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2);
  }

  checkAndUpdateMissionStatus(): Observable<any> {
    return this.http.post(`${this.baseUrl}/missions/update-status`, {});
  }

//   getMissionDetailsMissionEncours(id: number): Observable<any> {
//     return this.http.get(`${this.baseUrl}/missions/showClientMissionEncours/${id}`).pipe(
//       catchError(this.handleError)
//     );
// }

getMissionDetailsMissionEncours(clientId: number, missionId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/missions/showClientMissionEncours/${clientId}/${missionId}`).pipe(
      catchError(this.handleError)
  );
}




  // mission-service.service.ts
getTermineMissions(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:8000/api/missionsterminer');
}

//valider la mission
validerMission(missionId: number) {
  return this.http.post(`http://localhost:8000/api/missions/valider/${missionId}`, {});
}



}
