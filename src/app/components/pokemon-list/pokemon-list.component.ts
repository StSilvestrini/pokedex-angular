import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import type { IPokemonCardList } from 'src/app/interfaces';
import * as fromApp from '../../store/app.reducer';
import { UtilitiesService } from '../../services/utilities.service';
import { HttpPokedexService } from '../../services/http.service';
import { Subscription, switchMap, take } from 'rxjs';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';
import { StoreService } from 'src/app/services/store.service';
import { CompareModalComponent } from '../compare-modal/compare-modal.component';
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive';
import * as AuthAction from '../auth/store/auth.actions';
import { Route, Router } from '@angular/router';

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
    private ArrayManipulationService: ArrayManipulationService,
    private router: Router
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
      error: (error) => this.httpService.errorManager(error),
    });
    this.authSubscription = this.store.select('auth').subscribe({
      next: ({ isLogged }) => {
        this.isLogged = isLogged;
      },
    });
  }

  private initialSubscription: Subscription;
  private loadSubscription: Subscription;
  private changeNumberSubscription: Subscription;
  private pokemonDetailSubscription: Subscription;
  private closeSub: Subscription;
  private authSubscription: Subscription;

  pokemonList: IPokemonCardList[] = [];
  numberToShow = 'choose';
  gridLayout = 'regular';
  applyPipe = false;
  compareMode = false;
  pokemonsToCompare: string[] = [];
  showAuthInfo = false;
  isLogged: boolean;

  @ViewChild(PlaceholderDirective, { static: false })
  modalHost: PlaceholderDirective;

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
          this.storeService.dispatchPokemonList(this.pokemonList);
          this.storeService.dispatchNextLink(response?.next);
        },
        error: (error) => this.httpService.errorManager(error),
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
            this.storeService.dispatchPokemonList(this.pokemonList);
            this.storeService.dispatchNextLink(
              `https://pokeapi.co/api/v2/pokemon?offset=${this.pokemonList.length}&limit=20`
            );
          },
          error: (error) => this.httpService.errorManager(error),
        });
    } else {
      this.applyPipe = true;
    }
  };

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
      this.showModal(this.pokemonsToCompare);
    }
  };

  isSelected = (id) => this.pokemonsToCompare.some((el) => id === el);
  getId = this.utilityService.getId;
  getItem = this.utilityService.getItem;

  private showModal(compareArray: any[]) {
    const hostViewContainerRef = this.modalHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(
      CompareModalComponent
    );

    componentRef.instance.comparePokemons = compareArray;
    this.closeSub = componentRef.instance.close.subscribe({
      next: () => {
        this.compareMode = false;
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      },
      error: (error) => this.httpService.errorManager(error),
    });
  }

  onChangeDimension = (value) => {
    this.gridLayout = value;
  };

  onShowAuthInfo = () => {
    this.showAuthInfo = !this.showAuthInfo;
  };

  onLogout = () => {
    this.store.dispatch(AuthAction.Logout());
    this.isLogged = false;
  };

  onLoginNavigate = () => {
    this.router.navigate(['/auth']);
  };

  ngOnDestroy(): void {
    const { unsubscribeImproved } = this?.httpService || {};
    unsubscribeImproved(this.initialSubscription);
    unsubscribeImproved(this.loadSubscription);
    unsubscribeImproved(this.changeNumberSubscription);
    unsubscribeImproved(this.pokemonDetailSubscription);
    unsubscribeImproved(this.closeSub);
    unsubscribeImproved(this.authSubscription);
  }
}
