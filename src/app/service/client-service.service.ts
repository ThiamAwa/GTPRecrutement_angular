import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Client } from '../model/client';
@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  private apiUrl = 'http://localhost:8000/api/client';
  constructor(private httpClient : HttpClient) { }

  //obtenir la liste des client

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.apiUrl);
  }

  getClientById(clientId: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.apiUrl}/${clientId}`);
  }


}
