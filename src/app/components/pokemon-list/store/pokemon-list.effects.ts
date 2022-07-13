import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';

import * as PokemonListActions from './pokemon-list.actions';
import { HttpPokedexService } from 'src/app/services/http.service';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';
import { of } from 'rxjs';

@Injectable()
export class PokemonListEffects {
  fetchPokemonListByType = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonListActions.fetchPokemonListByType),
      switchMap(() => {
        return this.httpService.getPokemonByTypes();
      }),
      mergeMap((data) => [
        PokemonListActions.setPokemonListByType({
          payload: data?.pokemonArray,
        }),
        PokemonListActions.setTypeList({ payload: data?.typesArray }),
      ]),
      catchError((error) => {
        return of(PokemonListActions.errorPokemonList({ error }));
      })
    );
  });

  fetchPokemonList = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonListActions.fetchPokemonList),
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
        PokemonListActions.setPokemonList({ payload: results }),
        PokemonListActions.setNextLink({ payload: next }),
      ]),
      catchError((error) => {
        return of(PokemonListActions.errorPokemonList({ error }));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private httpService: HttpPokedexService,
    private ArrayManipulationService: ArrayManipulationService
  ) {}
}
