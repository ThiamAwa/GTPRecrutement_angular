import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offre } from '../model/offre';

@Injectable({
  providedIn: 'root'
})
export class OffreServiceService {
  private apiUrl = 'http://localhost:8000/api/offre';
  private apiUrlFiltrage = 'http://localhost:8000/api/offres/filtrage';
  private apiUrlMission = 'http://localhost:8000/api/publier/offre';
  missions = [];

  constructor(private httpClient: HttpClient) { }

  // Obtenir la liste des offres
  getOffres(): Observable<Offre[]> {
    return this.httpClient.get<Offre[]>(this.apiUrl);
  }

  // Ajouter une nouvelle offre
  addOffre(offre: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, offre);
  }

  // Récupérer une offre par ID
  getOffreById(id: number): Observable<Offre> {
    return this.httpClient.get<Offre>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une offre
  updateOffre(id: number, offreData: Offre): Observable<Offre> {
    return this.httpClient.put<Offre>(`${this.apiUrl}/${id}`, offreData);
  }

  // Supprimer une offre
  deleteOffre(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Filtrage des offres
  getFilteredOffres(filters: any): Observable<Offre[]> {
    let params = new HttpParams();

    // Add the filters to the request if they exist
    if (filters.lieu) {
      params = params.set('lieu', filters.lieu);
    }
    if (filters.experience) {
      params = params.set('experience', filters.experience);
    }
    if (filters.type_contrat) {
      params = params.set('type_contrat', filters.type_contrat);
    }

    return this.httpClient.get<Offre[]>(this.apiUrlFiltrage, { params });
  }





  publierOffre(missionId: number): Observable<any> {
    return this.httpClient.post(this.apiUrlMission, { mission_id: missionId });
  }
}
