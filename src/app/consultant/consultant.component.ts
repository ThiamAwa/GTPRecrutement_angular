import { Component } from '@angular/core';
import { Consultant } from '../model/consultant';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConsultantServiceService } from '../service/consultant-service.service';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent {
  namelogo: string = "assets/img/logo.png";
  face1: string = "assets/img/face1.jpg";
  tabConsultant: Consultant[] = [];

  constructor(
    private httpClient: HttpClient,
    private consultantService:ConsultantServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllConsultants();
  }
  getAllConsultants(): void {
    this.consultantService.getAllConsultant().subscribe((data: Consultant[]) => {
      this.tabConsultant = data;
      console.log(this.tabConsultant)
    },
    (error:any)=>{
      console.log(error);
    }
  )
  }

  // deleteConsultant(id: number): void {
  //   this.consultantService.deleteConsultant(id).subscribe(() => {
  //     this.consultantService= this.consultantService.filter(c => c.id !== id);
  //   });
  // }

}
