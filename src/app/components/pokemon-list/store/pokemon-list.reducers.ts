import * as PokemonListActions from './pokemon-list.actions';

export interface State {
  pokemonListByType: any;
  types: any;
  pokemonList: any;
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
    default:
      return state;
  }
}