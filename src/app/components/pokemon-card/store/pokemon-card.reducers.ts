import { IPokemonCard } from 'src/app/interfaces';
import * as PokemonCardActions from './pokemon-card.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  pokemonCards: IPokemonCard[];
}

const initialState: State = {
  pokemonCards: [],
};

const _pokemonCardReducer = createReducer(
  initialState,
  on(PokemonCardActions.addPokemonCard, (state, action) => {
    const pokemonCardsCopy = [...state.pokemonCards];
    pokemonCardsCopy.push(action.pokemonCard);
    return {
      ...state,
      pokemonCards: pokemonCardsCopy,
    };
  })
);

export function pokemonCardReducer(state: State, action: Action) {
  return _pokemonCardReducer(state, action);
}
