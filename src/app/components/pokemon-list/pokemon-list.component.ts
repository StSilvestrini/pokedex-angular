import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import type { IPokemonCardList } from 'src/app/interfaces';
import * as fromApp from '../../store/app.reducer';
import { UtilitiesService } from '../../services/utilities.service';
import { HttpPokedexService } from '../../services/http.service';
import { forkJoin, mergeMap, of, Subscription, switchMap, take } from 'rxjs';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';
import * as PokemonListActions from '../pokemon-list/store/pokemon-list.actions';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnDestroy {
  constructor(
    private httpService: HttpPokedexService,
    private storeService: StoreService,
    private utilityService: UtilitiesService,
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

  formatNumber = this.utilityService.getPrettyNumber;

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
      this.httpService
        .getPokemonCard(this?.pokemonsToCompare?.[0])
        .pipe(
          take(1),
          mergeMap((data) => {
            this.pokemonsToCompare = [data, this.pokemonsToCompare[1]];
            return this.httpService.getPokemonCard(
              this?.pokemonsToCompare?.[1]
            );
          })
        )
        .subscribe((data) => {
          this.pokemonsToCompare = [this.pokemonsToCompare[0], data];
        });
    }
  };

  isSelected = (id) => this.pokemonsToCompare.some((el) => id === el);
  getId = this.utilityService.getId;
  getItem = this.utilityService.getItem;

  onGridChange(value) {
    this.gridLayout = value;
    return;
  }

  ngOnDestroy(): void {
    const { unsubscribeImproved } = this?.httpService || {};
    unsubscribeImproved(this.initialSubscription);
    unsubscribeImproved(this.loadSubscription);
    unsubscribeImproved(this.changeNumberSubscription);
    unsubscribeImproved(this.pokemonDetailSubscription);
  }
}
