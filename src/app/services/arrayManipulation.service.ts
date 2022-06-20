import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ArrayManipulationService {
  getPokemonDetailInList = (pokemon) => {
    const pokemonId =
      pokemon?.url?.split('/')[pokemon?.url?.split('/')?.length - 2];
    const pokemonCard = { ...pokemon };
    pokemonCard.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    pokemonCard.id = +pokemonId;
    return pokemonCard;
  };
}
