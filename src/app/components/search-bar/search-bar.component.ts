import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IPokemonCardList } from 'src/app/interfaces';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';
import { HttpPokedexService } from 'src/app/services/http.service';
import * as fromApp from '../../store/app.reducer';
import * as PokemonListActions from '../pokemon-list/store/pokemon-list.actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchQuery: string;
  @ViewChild('searchForm') searchForm: NgForm;

  onClear = () => {
    this.searchForm.reset();
  };

  onSearch = (searchQuery) => {
    if (searchQuery?.length < 3) return;
    let pokemonFound: IPokemonCardList;
    this.store?.select('pokemonList').subscribe({
      next: (pokemonListState) => {
        const pokemonByType = [...pokemonListState?.pokemonListByType];
        const pokemonList = [...pokemonListState?.pokemonList];
        const arrayOfTypes = [];
        pokemonByType?.forEach((typeObj) => {
          let found = typeObj.pokemon.find(
            (pokemon) =>
              pokemon?.pokemon?.name?.toLowerCase() ===
              searchQuery.toLowerCase()
          );
          if (found) {
            const double = pokemonList.find((pokemonInList) => {
              return pokemonInList.name === found.pokemon.name;
            });
            if (double) return;
            arrayOfTypes.push(typeObj.name);
            pokemonFound = {
              ...this.ArrayManipulationService.getPokemonDetailInList(
                found.pokemon
              ),
              types: arrayOfTypes,
            };
          }
        });
      },
      error: (error) => this.httpService.errorManager(error),
    });
    if (pokemonFound) {
      this.store.dispatch(
        PokemonListActions.addPokemonList({ payload: pokemonFound })
      );
    }
  };

  constructor(
    private store: Store<fromApp.AppState>,
    private ArrayManipulationService: ArrayManipulationService,
    private httpService: HttpPokedexService
  ) {}
}
