import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import type { IPokemonCard } from 'src/app/interfaces';
import * as fromApp from '../../store/app.reducer';
import { FormatService } from '../../services/format.service';
import { HttpPokedexService } from '../../services/http.service';
import { Subscription } from 'rxjs';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';
import * as PokemonListActions from '../pokemon-list/store/pokemon-list.actions';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  constructor(
    private httpService: HttpPokedexService,
    private formatService: FormatService,
    private store: Store<fromApp.AppState>,
    private ArrayManipulationService: ArrayManipulationService
  ) {}
  pokemonList: IPokemonCard[] = [];
  initialSubscription: Subscription;
  loadSubscription: Subscription;
  nextLinkSubscription: Subscription;

  ngOnInit(): void {
    this.initialSubscription = this.store.select('pokemonList').subscribe({
      next: ({ pokemonList }) => {
        if (!pokemonList || !pokemonList.length) return;
        this.pokemonList = pokemonList.map((pokemonCard) => {
          const { types } =
            this.httpService.getPokemonTypes(pokemonCard.name) || {};

          return { ...pokemonCard, types };
        });
        return;
      },
    });
  }

  onLoadPokemon = () => {
    const {
      httpService: { genericGetRequest, getNextLink },
    } = this;
    const { nextLink, subscription } = getNextLink() || {};
    this.nextLinkSubscription = subscription;
    this.loadSubscription = genericGetRequest(nextLink).subscribe({
      next: (response) => {
        if (!response) return;
        const arrayExpanded = response?.results?.map((pokemon) => {
          return this.ArrayManipulationService.getPokemonDetailInList(pokemon);
        });
        this.pokemonList = this.pokemonList.concat(arrayExpanded);
        if (this.pokemonList && this.pokemonList.length) {
          this.store.dispatch(
            new PokemonListActions.SetPokemonList([...this.pokemonList])
          );
        }
        if (response?.next) {
          this.store.dispatch(
            new PokemonListActions.SetNextLink(response.next)
          );
        }
      },
    });
  };

  ngOnDestroy(): void {
    this.initialSubscription.unsubscribe();
    if (this.loadSubscription) {
      this.loadSubscription.unsubscribe();
    }
    if (this.nextLinkSubscription) {
      this.nextLinkSubscription.unsubscribe();
    }
  }

  formatNumber = this.formatService.getPrettyNumber;
}
