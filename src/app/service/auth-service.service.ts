import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://127.0.0.1:8000/api/login';
  private apiUrl1 = 'http://127.0.0.1:8000/api/logout';

  constructor(private http: HttpClient) { }


  login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, credentials, { headers }).pipe(
      tap(response => {
        // Stocker le jeton d'authentification
        localStorage.setItem('authToken', response.token);
      })
    );
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });
    console.log(this.getToken()) // Inclure le jeton


    return this.http.post<any>(this.apiUrl1, {}, { headers });
  }

  private getToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}
