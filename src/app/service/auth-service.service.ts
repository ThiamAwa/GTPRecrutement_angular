import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://127.0.0.1:8000/api/login';
  private apiUrl1 = 'http://127.0.0.1:8000/api/logout';
  private apiUrl2 = 'http://127.0.0.1:8000/api/user';

  constructor(private http: HttpClient) { }
  private getToken(): string {
    const token = localStorage.getItem('authToken');
    console.log('Jeton récupéré:', token);
    return token || '';
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, credentials, { headers }).pipe(
      tap(response => {
        console.log('Réponse de connexion:', response);
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        } else {
          console.error('Jeton manquant dans la réponse');
        }

        if (response.clientId) {
          localStorage.setItem('clientId', response.clientId.toString());
        } else {
          console.error('clientId manquant dans la réponse');
        }
      }),

    );
  }


  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });
    console.log('Jeton utilisé pour la déconnexion:', this.getToken());

    return this.http.post<any>(this.apiUrl1, {}, { headers });
  }

  // private getToken(): string {
  //   return localStorage.getItem('authToken') || '';
  // }

  getClientId(): number | null {
    const clientId = localStorage.getItem('clientId');
    return clientId ? parseInt(clientId, 10) : null;
  }

  getConsultantId():number | null{
    const consultantId=localStorage.getItem('consultantId');
    return consultantId ?parseInt(consultantId,10):null;

  }

  getUserInfo(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl2, { headers });
  }

}
