import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Consultant } from '../model/consultant';


@Injectable({
  providedIn: 'root'
})
export class ConsultantServiceService {

   private apiUrl = 'http://127.0.0.1:8000/api/consultant'

  constructor(private httpClient : HttpClient) { }

  getAllConsultant():Observable<Consultant[]>{
    return this.httpClient.get<Consultant[]>(this.apiUrl)

   }

   getConsultant(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }

  createConsultant(consultant: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, consultant);
  }

  updateConsultant(id: number, consultant: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, consultant);
  }

  deleteConsultant(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
