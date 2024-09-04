import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionServiceService {

  

  private apiUrl = 'http://localhost:8000/api/missions'; 

  constructor(private http: HttpClient) {}

  getMissions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createMission(mission: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mission);
  }

  updateMission(id: number, mission: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, mission);
  }

  deleteMission(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
