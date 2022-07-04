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

  getPokemonTypes = (pokemonByType, pokemonName) => {
    if (!pokemonByType?.length || !pokemonName) return;
    let types: any[] = [];
    pokemonByType.forEach((typeObj) => {
      const found = typeObj.pokemon.find(
        (pokemon) => pokemon?.pokemon?.name === pokemonName
      );
      if (found) {
        const newArray = [...types];
        newArray.push(typeObj.name);
        types = newArray;
      }
    });
    return types;
  };

  removeDuplicates = (array: any[]) => {
    return array.filter(function (element, index) {
      const findEl = array.find((el) => el.name === element.name);
      return array.indexOf(findEl) == index;
    });
  };

  getTypeProps = (pokemonCard, prop) =>
    pokemonCard?.types?.map((type) => type?.[prop]);

  getDamageRelationsName = (damageRelationsArray: any[]) => {
    let newArray = damageRelationsArray.map((damageRelationCards) => {
      return Object.keys(damageRelationCards).map((damageRelationObj) => {
        return {
          [damageRelationObj]: damageRelationCards[damageRelationObj].map(
            (damageRelation) => damageRelation?.name
          ),
        };
      });
    });
    return [].concat.apply([], newArray);
  };
}
