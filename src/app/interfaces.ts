export interface IPokemonCard {
  name: string;
  height: string;
  weight: string;
  id: number;
  abilities: string[];
  moves: string[];
  types: string[];
  sprites: {
    front_default: string;
  };
}

export interface IGenericShortInfo {
  name: string;
  url: string;
}

export interface IPokemonList {
  next: string;
  results: IGenericShortInfo[];
  count?: number;
}

export interface IType {
  results: IGenericShortInfo[];
}
