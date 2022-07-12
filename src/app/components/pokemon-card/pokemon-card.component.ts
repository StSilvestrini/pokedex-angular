import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription, switchMap, take } from 'rxjs';
import type { IPokemonCard } from 'src/app/interfaces';
import { UtilitiesService } from '../../services/utilities.service';
import { HttpPokedexService } from '../../services/http.service';
import { StoreService } from 'src/app/services/store.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import Chart from 'chart.js/auto';
import { getLocaleNumberSymbol } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  animations: [
    trigger('cardImage', [
      state('in', style({})),
      transition('void => *', [
        style({
          transform: 'translateX(-200px)',
          opacity: 0,
        }),
        animate(500),
      ]),
    ]),
    trigger('cardStats', [
      state('in', style({})),
      transition('void => *', [
        style({
          transform: 'translateX(200px)',
        }),
        animate(500),
      ]),
    ]),
  ],
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  pokemonCard: IPokemonCard;
  routeId: string;
  sendAction: boolean;
  loadDataSubscription: Subscription;
  actionSubscription: Subscription;
  ctx: any;

  constructor(
    private httpService: HttpPokedexService,
    private route: ActivatedRoute,
    private utilityService: UtilitiesService,
    private storeService: StoreService
  ) {}
  ngOnInit(): void {
    if (this.utilityService.isDesktop()) {
      window.scrollTo(0, document.body.scrollHeight * 0.2);
    } else {
      window.scrollTo(0, 0);
    }
    this.loadDataSubscription = this.route.params
      .pipe(
        switchMap((params) => {
          if (params['pokemonId'] !== this.routeId) {
            this.sendAction = true;
          }
          this.routeId = params['pokemonId'];
          return this.httpService.getPokemonCard(params['pokemonId']);
        }),
        switchMap(({ pokemonCard }) => {
          if (!pokemonCard?.types?.[0]?.damage_relations) {
            return this.storeService.getDamageRelations(pokemonCard);
          }
          return of({ pokemonCard });
        })
      )
      .subscribe(({ pokemonCard }) => {
        if (this.sendAction) {
          this.storeService.dispatchPokemonCard(pokemonCard);
          this.sendAction = false;
        }
        this.pokemonCard = pokemonCard;
        const labels = [];
        const data = [];
        pokemonCard?.stats?.forEach((el) => {
          labels?.push(el?.stat?.name);
          data?.push(el?.base_stat);
        });
        if (!this.ctx) {
          const ctx: any = document.getElementById('myChart');
          this.ctx = ctx;

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
              scales: {
                y: {
                  beginAtZero: true,
                  max: 180,
                  ticks: {
                    stepSize: 30,
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
        }
      });
  }

  getProperName = this.utilityService.getName('type');

  ngOnDestroy(): void {
    const { unsubscribeImproved } = this?.httpService || {};
    unsubscribeImproved(this.actionSubscription);
    unsubscribeImproved(this.loadDataSubscription);
  }
}
