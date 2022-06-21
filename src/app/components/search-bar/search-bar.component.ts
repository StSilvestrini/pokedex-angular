import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { IPokemonCardList } from 'src/app/interfaces';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';
import * as fromApp from '../../store/app.reducer';

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
    let pokemonFound: IPokemonCardList;
    this.store
      .select('pokemonList')
      .pipe(map((pokemonListState) => pokemonListState.pokemonListByType))
      .subscribe({
        next: (pokemonByType) => {
          const arrayOfTypes = [];
          pokemonByType.forEach((typeObj) => {
            let found = typeObj.pokemon.find((pokemon) =>
              pokemon?.pokemon?.name?.includes(searchQuery)
            );
            if (found) {
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
      });
    console.log('pokemonFound', pokemonFound);
  };

  constructor(
    private store: Store<fromApp.AppState>,
    private ArrayManipulationService: ArrayManipulationService
  ) {}
}
