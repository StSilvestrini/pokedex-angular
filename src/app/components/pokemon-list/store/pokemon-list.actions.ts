import { createAction, props } from '@ngrx/store';
import type { IPokemonArray, IPokemonCardList } from 'src/app/interfaces';

export const setPokemonListByType = createAction(
  '[Pokeon List] Set Pokeon List By Type',
  props<{ payload: IPokemonArray }>()
);

export const setTypeList = createAction(
  '[Pokeon List] Set Type List',
  props<{ payload: any[] }>()
);

export const setPokemonList = createAction(
  '[Pokeon List] Set Pokemon List',
  props<{ payload: IPokemonCardList[] }>()
);

export const setNextLink = createAction(
  '[Pokeon List] Set Next Link',
  props<{ payload: string }>()
);

export const fetchPokemonListByType = createAction(
  '[Pokeon List] Fetch Pokemon List Type'
);

export const fetchPokemonList = createAction(
  '[Pokeon List] Fetch Pokemon List'
);

export const addPokemonList = createAction(
  '[Pokeon List] Add Pokemon To Pokemon List',
  props<{ payload: IPokemonCardList }>()
);

export const errorPokemonList = createAction(
  '[Pokeon List] Error Relative To Pokemon List',
  props<{ error: any }>()
);
