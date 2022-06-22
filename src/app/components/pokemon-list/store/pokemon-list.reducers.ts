import type { IPokemonArray, IPokemonCardList } from 'src/app/interfaces';
import * as PokemonListActions from './pokemon-list.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  pokemonListByType: IPokemonArray;
  types: any[];
  pokemonList: IPokemonCardList[];
  nextLink?: string;
}

const initialState: State = {
  pokemonListByType: [],
  types: [],
  pokemonList: [],
};

const _pokemonListReducer = createReducer(
  initialState,
  on(PokemonListActions.setPokemonListByType, (state, action) => {
    return {
      ...state,
      pokemonListByType: [...action.payload],
    };
  }),
  on(PokemonListActions.setTypeList, (state, action) => {
    return {
      ...state,
      types: [...action.payload],
    };
  }),
  on(PokemonListActions.setPokemonList, (state, action) => {
    return {
      ...state,
      pokemonList: [...action.payload],
    };
  }),
  on(PokemonListActions.setNextLink, (state, action) => {
    return {
      ...state,
      nextLink: action.payload,
    };
  }),
  on(PokemonListActions.addPokemonList, (state, action) => {
    const pokemonListCopy = [...state.pokemonList];
    return {
      ...state,
      pokemonList: [...pokemonListCopy, action.payload],
    };
  })
);

export function pokemonListReducer(state: State, action: Action) {
  return _pokemonListReducer(state, action);
}
