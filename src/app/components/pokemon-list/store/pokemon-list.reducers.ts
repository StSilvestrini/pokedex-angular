import type { IPokemonArray, IPokemonCardList } from 'src/app/interfaces';
import * as PokemonListActions from './pokemon-list.actions';

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

export function pokemonListReducer(
  state = initialState,
  action: PokemonListActions.PokemonListActions
) {
  switch (action.type) {
    case PokemonListActions.SET_POKEMON_LIST_BY_TYPE:
      return {
        ...state,
        pokemonListByType: [...action.payload],
      };
    case PokemonListActions.SET_TYPE_LIST:
      return {
        ...state,
        types: [...action.payload],
      };
    case PokemonListActions.SET_POKEMON_LIST:
      return {
        ...state,
        pokemonList: [...action.payload],
      };
    case PokemonListActions.SET_NEXT_LINK:
      return {
        ...state,
        nextLink: action.payload,
      };
    case PokemonListActions.ADD_POKEMON_LIST:
      const pokemonListCopy = [...state.pokemonList];
      console.log('pokemonListCopy', pokemonListCopy);
      return {
        ...state,
        pokemonList: [...pokemonListCopy, action.payload],
      };
    default:
      return state;
  }
}
