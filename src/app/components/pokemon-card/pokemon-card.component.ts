import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import type { IPokemonCard } from 'src/app/interfaces';
import { FormatService } from '../../services/format.service';
import { HttpPokedexService } from '../../services/http.service';
import * as fromApp from '../../store/app.reducer';
import * as PokemonCardActions from '../pokemon-card/store/pokemon-card.actions';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  pokemonCard: IPokemonCard;
  pokemonId: string;
  pokemonCardSubscription: Subscription;
  routeSubscription: Subscription;
  storeSubscription: Subscription;

  constructor(
    private httpService: HttpPokedexService,
    private route: ActivatedRoute,
    private formatService: FormatService,
    private store: Store<fromApp.AppState>
  ) {}
  getCardFromStore = () => {
    let pokemonInStore: IPokemonCard;
    const storeSubscription = this.store
      .select('pokemonCard')
      .subscribe(({ pokemonCards }) => {
        if (pokemonCards && pokemonCards.length && this.pokemonId) {
          pokemonInStore = pokemonCards.find((card) => {
            return card.id === +this.pokemonId;
          });
        }
      });
    if (pokemonInStore) return pokemonInStore;
    return;
  };

  getPokemonCard = (pokemonId) => {
    const foundPokemonInStore = this.getCardFromStore();
    if (foundPokemonInStore) {
      this.pokemonCard = { ...foundPokemonInStore };
    } else {
      const { requstSingleCard, errorManager } = this.httpService;
      this.pokemonCardSubscription = requstSingleCard(pokemonId).subscribe({
        next: (res: IPokemonCard) => {
          this.pokemonCard = res;
          this.store.dispatch(
            new PokemonCardActions.AddPokemonCard(this.pokemonCard)
          );
        },
        error: errorManager,
      });
    }
  };

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.pokemonId = params['pokemonId'];
      this.getPokemonCard(params['pokemonId']);
    });
  }

  formatNumber = this.formatService.getPrettyNumber;

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    if (this.pokemonCardSubscription) {
      this.pokemonCardSubscription.unsubscribe();
    }
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
