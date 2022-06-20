import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPokemonCard } from 'src/app/interfaces';
import * as fromApp from '../../store/app.reducer';
import { FormatService } from '../../services/format.service';
import { HttpPokedexService } from '../../services/http.service';
import { map } from 'rxjs';
import { SET_NEXT_LINK, SET_POKEMON_LIST } from './store/pokemon-list.actions';
import * as PokemonListActions from '../pokemon-list/store/pokemon-list.actions';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  constructor(
    private httpService: HttpPokedexService,
    private formatService: FormatService,
    private store: Store<fromApp.AppState>,
    private ArrayManipulationService: ArrayManipulationService
  ) {}
  pokemonList: IPokemonCard[] = [];

  ngOnInit(): void {
    this.store
      .select('pokemonList')
      .pipe(map((pokemonListState) => pokemonListState.pokemonList))
      .subscribe({
        next: (list) => {
          if (!list) return;
          this.pokemonList = [...list];
          this.pokemonList = this.pokemonList.map((pokemonCard) => {
            const pokemonType = this.httpService.getPokemonTypes(
              pokemonCard.name
            );
            const newObj = { ...pokemonCard };
            newObj.types = pokemonType;
            return newObj;
          });
          return;
        },
      });
  }

  onLoadPokemon = () => {
    let {
      httpService: { genericGetRequest, errorManager },
    } = this;
    const nextLink = this.httpService.getNextLink();

    genericGetRequest(nextLink).subscribe({
      next: (response) => {
        if (!response) return;
        const arrayExpanded = response?.results?.map((pokemon) => {
          return this.ArrayManipulationService.getPokemonDetailInList(pokemon);
        });
        this.pokemonList = this.pokemonList.concat(arrayExpanded);
        if (this.pokemonList && this.pokemonList.length) {
          this.store.dispatch({
            type: SET_POKEMON_LIST,
            payload: [...this.pokemonList],
          });
        }
        if (response?.next) {
          this.store.dispatch({ type: SET_NEXT_LINK, payload: response.next });
        }
      },
      error: errorManager,
    });
  };

  formatNumber = this.formatService.getPrettyNumber;
}
