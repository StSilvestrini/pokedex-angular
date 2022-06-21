import { Action } from '@ngrx/store';
import { IPokemonCard } from 'src/app/interfaces';

export const ADD_POKEMON_CARD = '[Pokeon Card] Add Pokemon Card';

export class AddPokemonCard implements Action {
  readonly type = ADD_POKEMON_CARD;

  constructor(public payload: IPokemonCard) {}
}

export type PokemonCardActions = AddPokemonCard;
