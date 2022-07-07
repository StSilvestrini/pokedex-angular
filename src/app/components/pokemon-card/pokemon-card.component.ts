import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
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
        })
      )
      .subscribe((data) => {
        if (this.sendAction) {
          this.storeService.dispatchPokemonCard(data.pokemonCard);
          this.sendAction = false;
        }
        this.pokemonCard = { ...data.pokemonCard };
      });
  }

  getProperName = this.utilityService.getName('type');

  ngOnDestroy(): void {
    const { unsubscribeImproved } = this?.httpService || {};
    unsubscribeImproved(this.actionSubscription);
    unsubscribeImproved(this.loadDataSubscription);
  }
}
