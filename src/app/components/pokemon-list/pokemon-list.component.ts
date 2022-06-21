import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import type { IPokemonCard } from 'src/app/interfaces';
import * as fromApp from '../../store/app.reducer';
import { FormatService } from '../../services/format.service';
import { HttpPokedexService } from '../../services/http.service';
import { map, Subscription } from 'rxjs';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';
import * as PokemonListActions from '../pokemon-list/store/pokemon-list.actions';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  constructor(
    private httpService: HttpPokedexService,
    private formatService: FormatService,
    private store: Store<fromApp.AppState>,
    private ArrayManipulationService: ArrayManipulationService
  ) {}
  pokemonList: IPokemonCard[] = [];
  initialSubscription: Subscription;
  loadSubscription: Subscription;

  ngOnInit(): void {
    this.initialSubscription = this.store
      .select('pokemonList')
      .pipe(map((pokemonListState) => pokemonListState.pokemonList))
      .subscribe({
        next: (list) => {
          if (!list) return;
          this.pokemonList = list.map((pokemonCard) => {
            const pokemonType = this.httpService.getPokemonTypes(
              pokemonCard.name
            );
            return { ...pokemonCard, types: pokemonType };
          });
          return;
        },
        error: this.httpService.errorManager,
      });
  }

  onLoadPokemon = () => {
    const {
      httpService: { genericGetRequest, errorManager, getNextLink },
    } = this;
    const nextLink = getNextLink();

    this.loadSubscription = genericGetRequest(nextLink).subscribe({
      next: (response) => {
        if (!response) return;
        const arrayExpanded = response?.results?.map((pokemon) => {
          return this.ArrayManipulationService.getPokemonDetailInList(pokemon);
        });
        this.pokemonList = this.pokemonList.concat(arrayExpanded);
        if (this.pokemonList && this.pokemonList.length) {
          this.store.dispatch(
            new PokemonListActions.SetPokemonList([...this.pokemonList])
          );
        }
        if (response?.next) {
          this.store.dispatch(
            new PokemonListActions.SetNextLink(response.next)
          );
        }
      },
      error: errorManager,
    });
  };

  ngOnDestroy(): void {
    this.initialSubscription.unsubscribe();
    this.loadSubscription.unsubscribe();
  }

  formatNumber = this.formatService.getPrettyNumber;
}
