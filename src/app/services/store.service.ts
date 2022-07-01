import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import type { IPokemonCard } from '../interfaces';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as PokemonCardActions from '../components/pokemon-card/store/pokemon-card.actions';
import * as PokemonListActions from '../components/pokemon-list/store/pokemon-list.actions';
@Injectable({ providedIn: 'root' })
export class StoreService {
  constructor(private store: Store<fromApp.AppState>) {}

  dispatchPokemonCard = (pokemonCard) => {
    this.store.dispatch(
      PokemonCardActions.addPokemonCard({
        pokemonCard: { ...pokemonCard },
      })
    );
  };

  dispatchNextLink = (nextLink) => {
    if (nextLink) {
      this.store.dispatch(
        PokemonListActions.setNextLink({ payload: nextLink })
      );
    }
  };

  dispatchPokemonList = (list) => {
    if (list?.length) {
      this.store.dispatch(
        PokemonListActions.setPokemonList({
          payload: [...list],
        })
      );
    }
  };

  getNextLink = () => {
    return this.store.select('pokemonList').pipe(
      switchMap(({ nextLink }) => {
        return of({ nextLink });
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
            const weaknessesName = damage_relations?.double_damage_from?.map(
              (el) => el.name
            );
            return {
              weaknesses: weaknessesName,
              name,
              damage_relations,
            };
          });
        if (typesFiltered?.length) {
          return of({ pokemonCard: { ...pokemonCard, types: typesFiltered } });
        }
        return of({ pokemonCard });
      })
    );
  };
}
