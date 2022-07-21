import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
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
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { WindowRef } from 'src/app/shared/WindowRef';

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
    trigger('downEntrance', [
      state('in', style({})),
      transition('void => *', [
        style({
          transform: 'translateY(200px)',
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
  chartData: any[];
  chart: any;

  constructor(
    private httpService: HttpPokedexService,
    private route: ActivatedRoute,
    private utilityService: UtilitiesService,
    private storeService: StoreService,
    @Inject(PLATFORM_ID) private platformId,
    @Inject(DOCUMENT) private ngDocument: Document,
    private winRef: WindowRef
  ) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.utilityService.isDesktop()) {
        this.winRef.nativeWindow.scrollTo(
          0,
          this.ngDocument.body.scrollHeight * 0.05
        );
      } else {
        this.winRef.nativeWindow.scrollTo(0, 0);
      }
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
        }),
        switchMap(({ pokemonCard }) => {
          return this.httpService.addEvolutionChain(pokemonCard);
        })
      )
      .subscribe({
        next: ({ pokemonCard }) => {
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
          if (JSON.stringify(data) !== JSON.stringify(this.chartData)) {
            if (this.chart) {
              this.chart.destroy();
            }
            const chart = this.utilityService.chartFactory({
              selector: 'myChart',
              labels,
              data,
            });
            this.chart = chart;
            this.chartData = [...data];
          }
        },
        error: (error) => this.httpService.errorManager(error),
      });
  }

  getProperName = this.utilityService.getName('type');

  ngOnDestroy(): void {
    const { unsubscribeImproved } = this?.httpService || {};
    unsubscribeImproved(this.actionSubscription);
    unsubscribeImproved(this.loadDataSubscription);
  }
}
