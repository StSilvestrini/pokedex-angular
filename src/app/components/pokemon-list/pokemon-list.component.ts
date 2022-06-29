import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import type { IPokemonCardList } from 'src/app/interfaces';
import * as fromApp from '../../store/app.reducer';
import { FormatService } from '../../services/format.service';
import { HttpPokedexService } from '../../services/http.service';
import { of, Subscription, switchMap, take } from 'rxjs';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';
import * as PokemonListActions from '../pokemon-list/store/pokemon-list.actions';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  constructor(
    private httpService: HttpPokedexService,
    private storeService: StoreService,
    private formatService: FormatService,
    private store: Store<fromApp.AppState>,
    private ArrayManipulationService: ArrayManipulationService
  ) {
    this.initialSubscription = this.store.select('pokemonList').subscribe({
      next: ({ pokemonList, pokemonListByType }) => {
        this.pokemonList = pokemonList.map((pokemonCard) => {
          const types = this.ArrayManipulationService.getPokemonTypes(
            pokemonListByType,
            pokemonCard.name
          );
          return { ...pokemonCard, types };
        });
        return;
      },
    });
  }
  pokemonList: IPokemonCardList[] = [];
  initialSubscription: Subscription;
  loadSubscription: Subscription;
  changeNumberSubscription: Subscription;
  pokemonDetailSubscription: Subscription;
  gridLayout = 'regular';
  numberToShow = 'choose';
  applyPipe = false;
  compareMode = false;
  pokemonsToCompare: string[] = [];

  ngOnInit(): void {}

  onLoadPokemon = () => {
    this.applyPipe = false;
    this.numberToShow = 'choose';
    this.loadSubscription = this.storeService
      .getNextLink()
      .pipe(
        switchMap(({ nextLink }) => {
          return this.httpService.genericGetRequest(nextLink);
        }),
        take(1)
      )
      .subscribe({
        next: (response: any) => {
          this.pokemonList = this.addDetails(response);
          this.dispatchPokemonList();
          this.dispatchNextLink(response?.next);
        },
      });
  };

  addDetails = (arrayOfResults) => {
    const arrayExpanded = arrayOfResults?.results?.map((pokemon) => {
      return this.ArrayManipulationService.getPokemonDetailInList(pokemon);
    });
    return this.ArrayManipulationService.removeDuplicates(
      this.pokemonList.concat(arrayExpanded)
    );
  };

  dispatchPokemonList = () => {
    if (this.pokemonList?.length) {
      this.store.dispatch(
        PokemonListActions.setPokemonList({
          payload: [...this.pokemonList],
        })
      );
    }
  };

  dispatchNextLink = (nextLink) => {
    if (nextLink) {
      this.store.dispatch(
        PokemonListActions.setNextLink({ payload: nextLink })
      );
    }
  };

  onGridChange = (value: string) => {
    this.gridLayout = value;
    return;
  };

  onNumberChange = (value: string) => {
    this.numberToShow = value;
    if (+value > this.pokemonList?.length) {
      this.applyPipe = false;
      const numberOfPokemonToAdd = +value - this.pokemonList.length;
      this.changeNumberSubscription = this.httpService
        .genericGetRequest(
          `https://pokeapi.co/api/v2/pokemon?offset=${this.pokemonList.length}&limit=${numberOfPokemonToAdd}`
        )
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            this.pokemonList = this.addDetails(response);
            this.dispatchPokemonList();
            this.dispatchNextLink(
              `https://pokeapi.co/api/v2/pokemon?offset=${this.pokemonList.length}&limit=20`
            );
          },
        });
    } else {
      this.applyPipe = true;
    }
  };

  formatNumber = this.formatService.getPrettyNumber;

  onCompare = () => {
    this.compareMode = !this.compareMode;
    this.pokemonsToCompare = [];
  };

  onSelectCompare = (id) => {
    if (!id) return;
    const found = this.pokemonsToCompare.find((el) => el === id);
    if (found) {
      this.pokemonsToCompare = this.pokemonsToCompare.filter(
        (el) => el !== found
      );
      return;
    } else if (this.pokemonsToCompare.length < 2) {
      this.pokemonsToCompare.push(id);
    }
    if (this.pokemonsToCompare.length === 2) {
      this.getPokemonDetail(this.pokemonsToCompare[0]).subscribe({
        next: (data) => {
          console.log('data', data);
        },
      });
    }
  };

  isSelected = (id) => {
    return this.pokemonsToCompare.some((el) => id === el);
  };

  getPokemonDetail = (id) => {
    return this.storeService.getCardFromStore(id).pipe(
      switchMap((data: any) => {
        return data?.pokemonId
          ? this.httpService.getPokemonCardFromHTTP(data['pokemonId'])
          : of({ pokemonCard: data.pokemonInStore, isInStore: true });
      }),
      switchMap((data: any) => {
        if (data.isInStore) return of(data.pokemonCard);
        return this.storeService.getDamageRelations(data.pokemonCard);
      })
    );
  };

  ngOnDestroy(): void {
    const { unsubscribeImproved } = this?.httpService || {};
    unsubscribeImproved(this.initialSubscription);
    unsubscribeImproved(this.loadSubscription);
    unsubscribeImproved(this.changeNumberSubscription);
    unsubscribeImproved(this.pokemonDetailSubscription);
  }
}
