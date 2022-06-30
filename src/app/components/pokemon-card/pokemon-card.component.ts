import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import type { IPokemonCard } from 'src/app/interfaces';
import { UtilitiesService } from '../../services/utilities.service';
import { HttpPokedexService } from '../../services/http.service';
import * as fromApp from '../../store/app.reducer';
import * as PokemonCardActions from '../pokemon-card/store/pokemon-card.actions';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
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
    private store: Store<fromApp.AppState>
  ) {}
  formatNumber = this.utilityService.getPrettyNumber;

  ngOnInit(): void {
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
          this.store.dispatch(
            PokemonCardActions.addPokemonCard({
              pokemonCard: { ...data },
            })
          );
          this.sendAction = false;
        }
        this.pokemonCard = { ...data };
      });
  }

  getProperName = this.utilityService.getName('type');

  ngOnDestroy(): void {
    const { unsubscribeImproved } = this?.httpService || {};
    unsubscribeImproved(this.actionSubscription);
    unsubscribeImproved(this.loadDataSubscription);
  }
}
