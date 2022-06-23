import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, forkJoin, map, of, switchMap } from 'rxjs';
import type {
  IPokemonArrayElement,
  IPokemonCard,
  IPokemonList,
  IType,
} from '../interfaces';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class HttpPokedexService {
  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  getPokemonByTypes() {
    return this.http.get('https://pokeapi.co/api/v2/type').pipe(
      exhaustMap(({ results }: IType) => {
        const arrayOfRequests = results.map((typeObj) =>
          this.http.get(typeObj.url)
        );
        return forkJoin(arrayOfRequests);
      }),
      map((res) => {
        const pokemonArray = res.map(
          ({ name, pokemon }: IPokemonArrayElement) => {
            return {
              pokemon,
              name,
            };
          }
        );
        return {
          pokemonArray,
          typesArray: res,
        };
      })
    );
  }

  /*getPokemonCount = () => {
    let count: number;
    this.store
      .select('pokemonList')
      .pipe(map((pokemonListState) => pokemonListState.pokemonListByType))
      .subscribe((data) => {
        let mergedArray = [];
        data.forEach((el) => {
          mergedArray = [...mergedArray, ...el.pokemons];
        });
        const uniqueArray = mergedArray.filter(function (item, pos) {
          const found = mergedArray.find(
            (el) => el.pokemon.name === item.pokemon.name
          );
          return mergedArray.indexOf(found) == pos;
        });
        count = uniqueArray.length;
      });
    return count;
  }; */

  requestList = () => {
    return this.http
      .get<IPokemonList>(`https://pokeapi.co/api/v2/pokemon?limit=20`)
      .pipe(
        map(({ next, results }) => {
          return { next, results };
        })
      );
  };

  requstSingleCard = (pokemonId) =>
    this.http
      .get<IPokemonCard>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .pipe(
        map(
          ({ name, height, weight, id, abilities, moves, types, sprites }) => {
            return {
              name,
              height,
              weight,
              id,
              abilities,
              moves,
              types,
              sprites,
            };
          }
        )
      );

  genericGetRequest = (url: string) => this.http.get<any>(url);

  errorManager = (error) => {
    throw Error(error.message);
  };

  getNextLink = () => {
    return this.store.select('pokemonList').pipe(
      switchMap(({ nextLink }) => {
        return of({ nextLink });
      })
    );
  };

  getPokemonCardFromHTTP = (pokemonId) => {
    return this.requstSingleCard(pokemonId).pipe(
      switchMap((pokemonCard) => {
        return of({ pokemonCard });
      })
    );
  };

  getCardFromStore = (pokemonId) => {
    return this.store.select('pokemonCard').pipe(
      switchMap(({ pokemonCards }) => {
        let pokemonInStore: IPokemonCard;
        if (pokemonCards?.length && pokemonId) {
          pokemonInStore = pokemonCards.find((card) => {
            return card?.id === +pokemonId;
          });
        }
        if (pokemonInStore) return of({ pokemonInStore });
        return of({ pokemonId });
      })
    );
  };

  getDamageRelations = (pokemonCard) => {
    return this.store.select('pokemonList').pipe(
      switchMap(({ types }) => {
        const typesFiltered = types
          .filter((type) => {
            return pokemonCard.types.find((pokemonType) => {
              return pokemonType?.type?.name === type?.name;
            });
          })
          .map(({ damage_relations, name }) => {
            return { damage_relations, name };
          });
        if (typesFiltered?.length) {
          return of({ ...pokemonCard, types: typesFiltered });
        }
        return of(pokemonCard);
      })
    );
  };
}
