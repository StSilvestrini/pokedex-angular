import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import Chart from 'chart.js/auto';

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    @Inject(DOCUMENT) private ngDocument: Document
  ) {}
  getId = (index: number, item) => item?.id;
  getItem = (index: number, item) => item;

  getName(key) {
    return function (index: number, value: any): string {
      return value?.[key]?.name ? value?.[key]?.name : value?.name;
    };
  }

  getAverage = (a, b) => [
    Math.round((a / (a + b)) * 100),
    Math.round((b / (a + b)) * 100),
  ];

  hasCommonElement = (arr1, arr2) => arr1?.some((r) => arr2?.includes(r));

  getTotal = ({ damageRelations, baseExperience }, typeArray) => {
    damageRelations.forEach((el) => {
      const firstKey = Object.keys(el)?.[0];
      switch (firstKey) {
        case 'double_damage_from':
          if (this.hasCommonElement(el['double_damage_from'], typeArray)) {
            baseExperience = baseExperience * 0.7;
          }
        case 'half_damage_from':
          if (this.hasCommonElement(el['half_damage_from'], typeArray)) {
            baseExperience = baseExperience * 1.2;
          }
        case 'no_damage_from':
          if (this.hasCommonElement(el['no_damage_from'], typeArray)) {
            baseExperience = baseExperience * 1.5;
          }
      }
    });
    return Math.round(baseExperience * 100) / 100;
  };

  hasFalsyValues = (array: any[]) => {
    return array.some((el) => !el);
  };

  isMobile = () => !!(window.innerWidth <= 480);
  isDesktop = () => !!(window.innerWidth >= 780);

  chartFactory = ({ selector, labels, data }) => {
    if (!isPlatformBrowser(this.platformId)) return; //new Chart at line 58 will not work for ssr otherwise
    const ctx: any = this.ngDocument.getElementById(selector);
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 180,
            ticks: {
              stepSize: 30,
            },
          },
          x: {
            ticks: {
              font: {
                size: 10,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
    return chart;
  };
}
