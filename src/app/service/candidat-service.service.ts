import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidat } from '../model/candidat';

@Injectable({
  providedIn: 'root'
})
export class CandidatServiceService {

  private apiUrl = 'http://127.0.0.1:8000/api/candidat';

  constructor(private httpClient: HttpClient) { }

  getAllCandidat(): Observable<Candidat[]> {
    return this.httpClient.get<Candidat[]>(this.apiUrl);
  }

  createCandidat(candidat: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, candidat);
  }

  getFilterCandidat(filters: any): Observable<Candidat[]> {
    let params = new HttpParams();

    if (filters.competences) {
      params = params.set('competences', filters.competences);
    }
    if (filters.experience) {
      params = params.set('experience', filters.experience);
    }
    return this.httpClient.get<Candidat[]>(`${this.apiUrl}/filtrage`, { params });
  }

  updateStatus(candidatId: number, status: string): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${candidatId}/status`, { status });
  }

  deleteCandidat(candidatId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${candidatId}`);
  }
}
