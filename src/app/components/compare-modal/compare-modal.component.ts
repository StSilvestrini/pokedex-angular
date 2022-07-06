import {
  AfterContentChecked,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { mergeMap, Subscription, take } from 'rxjs';
import { IChartConfig } from 'src/app/interfaces';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';
import { HttpPokedexService } from 'src/app/services/http.service';
import { StoreService } from 'src/app/services/store.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-compare-modal',
  templateUrl: './compare-modal.component.html',
  styleUrls: ['./compare-modal.component.scss'],
})
export class CompareModalComponent
  implements OnInit, OnDestroy, AfterContentChecked
{
  @Output() close = new EventEmitter<void>();
  @Input() comparePokemons: any[];
  @ViewChild('myChart')
  myChart: any;
  showChart = false;
  compareSubscription: Subscription;
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

  constructor(
    private httpService: HttpPokedexService,
    private storeService: StoreService,
    private arrayManipulationService: ArrayManipulationService,
    private utilityService: UtilitiesService
  ) {
    this.isMobile = this.utilityService.isMobile();
  }

  ngOnInit() {
    this.compareSubscription = this.httpService
      .getPokemonCard(this?.comparePokemons?.[0])
      .pipe(
        mergeMap((data) => {
          this.comparePokemons = [data?.pokemonCard, this.comparePokemons[1]];
          if (!data?.isInStore)
            this.storeService.dispatchPokemonCard(data.pokemonCard);
          return this.httpService.getPokemonCard(this?.comparePokemons?.[1]);
        }),
        take(1)
      )
      .subscribe((data) => {
        if (!data?.isInStore)
          this.storeService.dispatchPokemonCard(data?.pokemonCard);
        this.comparePokemons = [this.comparePokemons?.[0], data?.pokemonCard];
        this.comparePokemons = this.comparePokemons?.map((el, index) => {
          return {
            ...el,
            winningChances: this.getWinningChance(this.comparePokemons)?.[
              index
            ],
          };
        });
      });
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

  getWinningChance = (pokemonsToCompare: any[]) => {
    const { getTotal, getAverage } = this.utilityService;
    const { getTypeProps, getDamageRelationsName } =
      this.arrayManipulationService;

    const pokemonData = pokemonsToCompare.map((pokemon) => {
      const damage_relations = getTypeProps(pokemon, 'damage_relations');
      return {
        types: getTypeProps(pokemon, 'name'),
        damageRelations: getDamageRelationsName(damage_relations),
        baseExperience: pokemon?.base_experience,
      };
    });

    const totals: [number, number] = [
      getTotal(pokemonData?.[0], pokemonData?.[1].types),
      getTotal(pokemonData?.[1], pokemonData?.[0].types),
    ];
    return getAverage(...totals);
  };

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

  onClose() {
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.httpService.unsubscribeImproved(this.compareSubscription);
  }
}
