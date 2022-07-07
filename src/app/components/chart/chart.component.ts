import {
  AfterContentChecked,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { IChartConfig } from 'src/app/interfaces';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements AfterContentChecked {
  chartConfig: IChartConfig = {
    data: {
      labels: [], //pokemon name here
      datasets: [
        {
          label: '% winning odds',
          data: [], //winning chances here
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1,
          barThickness: this.utilityService.isMobile() ? 20 : 50,
        },
        {
          label: '% base points',
          data: [], //winning chances here
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1,
          barThickness: this.utilityService.isMobile() ? 20 : 50,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: 100,
              stepSize: 20,
            },
          },
        ],
      },
    },
  };
  isMobile: boolean;
  @ViewChild('myChart')
  myChart: any;
  @Input() comparePokemons: any[];
  showChart = false;

  constructor(private utilityService: UtilitiesService) {
    this.isMobile = this.utilityService.isMobile();
  }

  ngAfterContentChecked(): void {
    const namesArray = [];
    const winningChancesArray = [];
    const baseExperiencesArray = [];
    this.comparePokemons.forEach((pok) => {
      namesArray.push(pok?.name?.toUpperCase());
      winningChancesArray.push(pok?.winningChances);
      baseExperiencesArray.push(pok?.base_experience);
    });

    if (
      !this.utilityService.hasFalsyValues([
        ...namesArray,
        ...winningChancesArray,
        ...baseExperiencesArray,
      ])
    ) {
      this.chartConfig.data.labels = [...namesArray];
      this.chartConfig.data.datasets[0].data = [...winningChancesArray];
      this.chartConfig.data.datasets[1].data = [
        ...this.utilityService.getAverage(
          baseExperiencesArray[0],
          baseExperiencesArray[1]
        ),
      ];

      this.showChart = true;
    }
  }

  changeBarThickness = (value) => {
    this.chartConfig.data.datasets = this.chartConfig.data.datasets.map(
      (el) => {
        return { ...el, barThickness: value };
      }
    );
  };

  onResize() {
    if (this.isMobile !== this.utilityService.isMobile()) {
      this.changeBarThickness(this.utilityService?.isMobile() ? 20 : 50);
      this.myChart.chart.update();
      this.isMobile = this.utilityService.isMobile();
    }
  }
}
