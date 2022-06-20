import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPokemonCard } from 'src/app/interfaces';
import * as fromApp from '../../store/app.reducer';
import { FormatService } from '../../services/format.service';
import { HttpPokedexService } from '../../services/http.service';
import { map } from 'rxjs';
import { SET_NEXT_LINK, SET_POKEMON_LIST } from './store/pokemon-list.actions';
import * as PokemonListActions from '../pokemon-list/store/pokemon-list.actions';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  constructor(
    private httpService: HttpPokedexService,
    private formatService: FormatService,
    private store: Store<fromApp.AppState>
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
        let newArray = [...this.pokemonList, ...response.results];
        if (newArray && newArray.length) {
          this.store.dispatch({
            type: SET_POKEMON_LIST,
            payload: [...newArray],
          });
        }
        if (response?.next) {
          this.store.dispatch({ type: SET_NEXT_LINK, payload: response.next });
        }
      },
      error: errorManager,
    });
  };

  getBackground(pokemon) {
    const image = this.pokemonList.find(
      (pok) => pok?.name === pokemon?.name
    )?.image;
    if (!image) return;
    return { backgroundImage: `url(${image})` };
  }

  formatNumber = this.formatService.getPrettyNumber;
}
