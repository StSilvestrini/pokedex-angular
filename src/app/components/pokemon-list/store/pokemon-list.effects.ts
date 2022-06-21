import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, mergeMap } from 'rxjs/operators';

import * as PokemonListActions from './pokemon-list.actions';
import { HttpPokedexService } from 'src/app/services/http.service';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';

@Injectable()
export class PokemonListEffects {
  @Effect()
  fetchPokemonListByType = this.actions$.pipe(
    ofType(PokemonListActions.FETCH_POKEMON_LIST_TYPE),
    switchMap(() => {
      return this.httpService.getPokemonByTypes();
    }),
    mergeMap((data) => [
      new PokemonListActions.SetPokemonListByType(data.pokemonArray),
      new PokemonListActions.SetTypeList(data.typesArray),
    ])
  );

  @Effect()
  fetchPokemonList = this.actions$.pipe(
    ofType(PokemonListActions.FETCH_POKEMON_LIST),
    switchMap(() => {
      return this.httpService.requestList();
    }),
    map(({ results, next }) => {
      const arrayExpanded = results?.map((pokemon) => {
        return this.ArrayManipulationService.getPokemonDetailInList(pokemon);
      });
      return { next, results: arrayExpanded };
    }),
    mergeMap(({ next, results }) => [
      new PokemonListActions.SetPokemonList(results),
      new PokemonListActions.SetNextLink(next),
    ])
  );

  constructor(
    private actions$: Actions,
    private httpService: HttpPokedexService,
    private ArrayManipulationService: ArrayManipulationService
  ) {}
}
