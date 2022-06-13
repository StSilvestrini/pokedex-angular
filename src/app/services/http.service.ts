import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IPokemonCard, IPokemonList } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class HttpPokedexService {
  constructor(private http: HttpClient) {}

  requestList = () =>
    this.http.get<IPokemonList>('https://pokeapi.co/api/v2/pokemon').pipe(
      map(({ next, results }) => {
        return { next, results };
      })
    );

  requstSingleCard = (pokemonId) =>
    this.http
      .get<IPokemonCard>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .pipe(
        map(
          ({
            name,
            height,
            weight,
            id,
            abilities,
            moves,
            types,
            sprites: { front_default },
          }) => {
            return {
              name,
              height,
              weight,
              id,
              abilities,
              moves,
              types,
              sprites: { front_default },
            };
          }
        )
      );

  genericGetRequest = (url: string) => this.http.get<any>(url);

  errorManager = (error) => {
    throw Error(error.message);
  };
}
