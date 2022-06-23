import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import type { IPokemonCardList } from 'src/app/interfaces';
import * as fromApp from '../../store/app.reducer';
import { FormatService } from '../../services/format.service';
import { HttpPokedexService } from '../../services/http.service';
import { Subscription, switchMap, take } from 'rxjs';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';
import * as PokemonListActions from '../pokemon-list/store/pokemon-list.actions';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  constructor(
    private httpService: HttpPokedexService,
    private storeService: StoreService,
    private formatService: FormatService,
    private store: Store<fromApp.AppState>,
    private ArrayManipulationService: ArrayManipulationService
  ) {
    this.initialSubscription = this.store.select('pokemonList').subscribe({
      next: ({ pokemonList, pokemonListByType }) => {
        this.pokemonList = pokemonList.map((pokemonCard) => {
          const types = this.ArrayManipulationService.getPokemonTypes(
            pokemonListByType,
            pokemonCard.name
          );
          return { ...pokemonCard, types };
        });
        return;
      },
    });
  }
  pokemonList: IPokemonCardList[] = [];
  initialSubscription: Subscription;
  loadSubscription: Subscription;

  ngOnInit(): void {}

  onLoadPokemon = () => {
    this.loadSubscription = this.storeService
      .getNextLink()
      .pipe(
        switchMap(({ nextLink }) => {
          return this.httpService.genericGetRequest(nextLink);
        }),
        take(1)
      )
      .subscribe({
        next: (response: any) => {
          const arrayExpanded = response?.results?.map((pokemon) => {
            return this.ArrayManipulationService.getPokemonDetailInList(
              pokemon
            );
          });
          this.pokemonList = this.pokemonList.concat(arrayExpanded);
          if (this.pokemonList && this.pokemonList.length) {
            this.store.dispatch(
              PokemonListActions.setPokemonList({
                payload: [...this.pokemonList],
              })
            );
          }
          if (response?.next) {
            this.store.dispatch(
              PokemonListActions.setNextLink({ payload: response.next })
            );
          }
        },
      });
  };

  formatNumber = this.formatService.getPrettyNumber;

  ngOnDestroy(): void {
    this.httpService.unsubscribeImproved(this.initialSubscription);
    this.httpService.unsubscribeImproved(this.loadSubscription);
  }
}
