import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Subscription, switchMap, take } from 'rxjs';
import type { IPokemonCard } from 'src/app/interfaces';
import { StoreService } from 'src/app/services/store.service';
import { FormatService } from '../../services/format.service';
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
  pokemonId: string;
  typesFiltered: any[];
  loadDataSubscription: Subscription;
  actionSubscription: Subscription;

  constructor(
    private httpService: HttpPokedexService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private formatService: FormatService,
    private store: Store<fromApp.AppState>
  ) {}
  formatNumber = this.formatService.getPrettyNumber;

  ngOnInit(): void {
    this.loadDataSubscription = this.route.params
      .pipe(
        switchMap((params) => {
          return this.storeService.getCardFromStore(params['pokemonId']);
        }),
        switchMap((data: any) => {
          return data?.pokemonId
            ? this.httpService.getPokemonCardFromHTTP(data['pokemonId'])
            : of({ pokemonCard: data.pokemonInStore });
        }),
        switchMap((data) => {
          return this.storeService.getDamageRelations(data.pokemonCard);
        })
      )
      .subscribe((data) => {
        this.pokemonCard = { ...data };
      });

    this.actionSubscription = this.route.params.subscribe(() => {
      if (this.pokemonCard) {
        this.store.dispatch(
          PokemonCardActions.addPokemonCard({
            pokemonCard: { ...this.pokemonCard },
          })
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.pokemonCard) {
      this.store.dispatch(
        PokemonCardActions.addPokemonCard({
          pokemonCard: { ...this.pokemonCard },
        })
      );
    }
    this.httpService.unsubscribeImproved(this.actionSubscription);
    this.httpService.unsubscribeImproved(this.loadDataSubscription);
  }
}
