import { ActionReducerMap } from '@ngrx/store';

import * as fromPokemonList from '../components/pokemon-list/store/pokemon-list.reducers';
import * as fromPokemonCard from '../components/pokemon-card/store/pokemon-card.reducers';

export interface AppState {
  pokemonList: fromPokemonList.State;
  pokemonCard: fromPokemonCard.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  pokemonList: fromPokemonList.pokemonListReducer,
  pokemonCard: fromPokemonCard.pokemonCardReducer,
};
