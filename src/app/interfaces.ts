export interface IPokemonCard {
  name: string;
  height: string;
  weight: string;
  id: number;
  abilities: string[];
  moves: string[];
  types: string[];
  image?: string;
}

export interface IGenericShortInfo {
  name: string;
  url: string;
}

export interface IPokemonCardList extends IGenericShortInfo {
  image: string;
  id: number;
  types: string[];
}

export interface IPokemonList {
  next: string;
  results: IPokemonCardList[];
  count?: number;
}

export interface IType {
  results: IGenericShortInfo[];
}
