import { Component } from '@angular/core';
import { MissionServiceService } from '../service/mission-service.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent {
  // statistics: any[] = {  [], en_cours: 0, terminee: 0 };
  missionsEnCours: any[] = [];
  missionEnAttente: any[] = [];
  missionsTerminees: any[] = [];

  chart: any;


  constructor(private missionService: MissionServiceService) {}

  ngOnInit(): void {
    this.loadStatistics();
    this.createChart();
  }

  loadStatistics(): void {
    this.missionService.getMissionStatistics().subscribe(
      data => {
        console.log('Mission statistics received:', data);
        // this.statistics = data;
        this.missionsTerminees=data;
        this.missionEnAttente=data;
        this.missionsEnCours=data;
      },
      error => {
        console.error('Error fetching mission statistics', error);
      }
    );
  }

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
                                 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
           datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
                                 '574', '573', '576'],
            // backgroundColor: 'blue'
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
          },
          // {
          //   label: "Profit",
          //   data: ['542', '542', '536', '327', '17',
          //                            '0.00', '538', '541'],
          //   backgroundColor: 'limegreen'
          // }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }


}
