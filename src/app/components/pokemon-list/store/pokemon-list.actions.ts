import { Action } from '@ngrx/store';
import type { IPokemonArray } from 'src/app/interfaces';

export const SET_POKEMON_LIST_BY_TYPE = '[Pokeon List] Set Pokeon List By Type';
export const SET_TYPE_LIST = '[Pokeon List] Set Type List';
export const FETCH_POKEMON_LIST_TYPE = '[Pokeon List] Fetch Pokemon List Type';
export const FETCH_POKEMON_LIST = '[Pokeon List] Fetch Pokemon List';
export const SET_POKEMON_LIST = '[Pokeon List] Set Pokemon List';
export const SET_NEXT_LINK = '[Pokeon List] Set Next Link';

export class SetPokemonListByType implements Action {
  readonly type = SET_POKEMON_LIST_BY_TYPE;

  constructor(public payload: IPokemonArray) {}
}

export class SetTypeList implements Action {
  readonly type = SET_TYPE_LIST;

  constructor(public payload: any) {}
}

export class SetPokemonList implements Action {
  readonly type = SET_POKEMON_LIST;

  constructor(public payload: any) {}
}

export class SetNextLink implements Action {
  readonly type = SET_NEXT_LINK;

  constructor(public payload: string) {}
}

export class FetchPokemonListByType implements Action {
  readonly type = FETCH_POKEMON_LIST_TYPE;
}

export class FetchPokemonList implements Action {
  readonly type = FETCH_POKEMON_LIST;
}

export type PokemonListActions =
  | SetPokemonListByType
  | SetTypeList
  | SetPokemonList
  | FetchPokemonList
  | FetchPokemonListByType
  | SetNextLink;
