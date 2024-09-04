import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Candidat } from '../model/candidat';

@Injectable({
  providedIn: 'root'
})
export class CandidatServiceService {

  constructor( private httpClient : HttpClient) { }

  getAllCandidat():Observable<Candidat[]>{
    return this.httpClient.get<Candidat[]>('http://127.0.0.1:8000/api/candidat')

   }
   createCandidat(candidat: any): Observable<any> {
    return this.httpClient.post<any>('http://127.0.0.1:8000/api/candidat', candidat);
  }
}
