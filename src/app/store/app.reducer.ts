import { ActionReducerMap } from '@ngrx/store';

import * as fromPokemonList from '../components/pokemon-list/store/pokemon-list.reducers';

export interface AppState {
  pokemonList: fromPokemonList.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  pokemonList: fromPokemonList.pokemonListReducer,
};
