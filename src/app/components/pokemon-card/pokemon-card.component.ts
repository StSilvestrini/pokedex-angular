import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Subscription, switchMap } from 'rxjs';
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
  routeId: string;
  sendAction: boolean;
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
          if (params['pokemonId'] !== this.routeId) {
            this.sendAction = true;
          }
          this.routeId = params['pokemonId'];
          return this.storeService.getCardFromStore(params['pokemonId']);
        }),
        switchMap((data: any) => {
          return data?.pokemonId
            ? this.httpService.getPokemonCardFromHTTP(data['pokemonId'])
            : of({ pokemonCard: data.pokemonInStore, isInStore: true });
        }),
        switchMap((data: any) => {
          if (data.isInStore) return of(data.pokemonCard);
          return this.storeService.getDamageRelations(data.pokemonCard);
        })
      )
      .subscribe((data) => {
        console.log('<<<<<', data);
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

  ngOnDestroy(): void {
    this.httpService.unsubscribeImproved(this.actionSubscription);
    this.httpService.unsubscribeImproved(this.loadDataSubscription);
  }
}
