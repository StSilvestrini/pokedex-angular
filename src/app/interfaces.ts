export interface IPokemonCard {
  name: string;
  height: string;
  weight: string;
  id: number;
  abilities: string[];
  moves: string[];
  types: any;
  sprites: { front_default: string };
  base_experience: number;
  stats: any[];
}

export interface IGenericShortInfo {
  name: string;
  url: string;
}

export interface IPokemonCardList extends IGenericShortInfo {
  image: string;
  id: number;
  types?: any;
}

export interface IPokemonList {
  next: string;
  results: IPokemonCardList[];
  count?: number;
}

export interface IType {
  results: IGenericShortInfo[];
}

export type IPokemonArray = IPokemonArrayElement[];

export interface IPokemonArrayElement {
  pokemon: {
    pokemon: IGenericShortInfo;
  }[];
  name: string;
}
