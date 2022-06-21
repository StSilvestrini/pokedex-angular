import { IPokemonCard } from 'src/app/interfaces';
import * as PokemonCardActions from './pokemon-card.actions';

export interface State {
  pokemonCards: IPokemonCard[];
}

const initialState: State = {
  pokemonCards: [],
};

export function pokemonListReducer(
  state = initialState,
  action: PokemonCardActions.PokemonCardActions
) {
  switch (action.type) {
    case PokemonCardActions.ADD_POKEMON_CARD:
      const pokemonCardsCopy = [...state.pokemonCards];
      pokemonCardsCopy.push(action.payload);
      return {
        ...state,
        pokemonCards: pokemonCardsCopy,
      };
    default:
      return state;
  }
}
