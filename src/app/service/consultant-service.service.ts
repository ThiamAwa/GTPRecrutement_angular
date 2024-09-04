import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Consultant } from '../model/consultant';


@Injectable({
  providedIn: 'root'
})
export class ConsultantServiceService {

  constructor(private httpClient : HttpClient) { }

  getAllConsultant():Observable<Consultant[]>{
    return this.httpClient.get<Consultant[]>('http://127.0.0.1:8000/api/consultant')

   }
}
