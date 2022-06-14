import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, forkJoin, map } from 'rxjs';
import { IPokemonCard, IPokemonList, IType } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class HttpPokedexService {
  constructor(private http: HttpClient) {}
  types: any[];
  pokemonByType: any[];

  getPokemonByTypes() {
    return this.http
      .get('https://pokeapi.co/api/v2/type')
      .pipe(
        exhaustMap(({ results }: IType) => {
          const arrayOfRequests = results.map((typeObj) =>
            this.http.get(typeObj.url)
          );
          return forkJoin(arrayOfRequests);
        }),
        map((res) => {
          const pokemonArray = res.map((typeObj: any) => {
            return {
              pokemons: typeObj.pokemon,
              name: typeObj.name,
            };
          });
          return {
            pokemonArray: pokemonArray,
            typesArray: res,
          };
        })
      )
      .subscribe({
        next: (res) => {
          this.pokemonByType = res.pokemonArray;
          this.types = res.typesArray;
        },
      });
  }

  requestList = () =>
    this.http
      .get<IPokemonList>('https://pokeapi.co/api/v2/pokemon?limit=100')
      .pipe(
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
