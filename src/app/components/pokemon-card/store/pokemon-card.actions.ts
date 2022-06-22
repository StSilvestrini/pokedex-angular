import { createAction, props } from '@ngrx/store';
import { IPokemonCard } from 'src/app/interfaces';

export const ADD_POKEMON_CARD = '[Pokeon Card] Add Pokemon Card';

export const addPokemonCard = createAction(
  '[Pokeon Card] Add Pokemon Card',
  props<{ pokemonCard: IPokemonCard }>()
);
