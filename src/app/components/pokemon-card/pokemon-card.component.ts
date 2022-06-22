import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Subscription, switchMap, take } from 'rxjs';
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
  typesFiltered: any[];
  loadDataSubscription: Subscription;
  actionSubscription: Subscription;

  constructor(
    private httpService: HttpPokedexService,
    private route: ActivatedRoute,
    private formatService: FormatService,
    private store: Store<fromApp.AppState>
  ) {}

  getDamageRelations = (pokemonCard) => {
    const damageRelationSubscription = this.store.select('pokemonList').pipe(
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
    return damageRelationSubscription;
  };

  getCardFromStore = (pokemonId) => {
    const storeSubscription = this.store.select('pokemonCard').pipe(
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
    return storeSubscription;
  };

  formatNumber = this.formatService.getPrettyNumber;

  getPokemonCardFromHTTP = (pokemonId) => {
    const { requstSingleCard } = this.httpService;
    const pokemonCardSubscription = requstSingleCard(pokemonId).pipe(
      switchMap((pokemonCard) => {
        return of({ pokemonCard });
      })
    );
    return pokemonCardSubscription;
  };

  ngOnInit(): void {
    this.loadDataSubscription = this.route.params
      .pipe(
        switchMap((params) => {
          return this.getCardFromStore(params['pokemonId']);
        }),
        switchMap((data: any) => {
          return data?.pokemonId
            ? this.getPokemonCardFromHTTP(data['pokemonId'])
            : of({ pokemonCard: data.pokemonInStore });
        }),
        switchMap((data) => {
          return this.getDamageRelations(data.pokemonCard);
        })
      )
      .subscribe((data) => {
        this.pokemonCard = { ...data };
      });

    this.actionSubscription = this.route.params.subscribe(() => {
      if (this.pokemonCard) {
        this.store.dispatch(
          PokemonCardActions.addPokemonCard({
            pokemonCard: { ...this.pokemonCard },
          })
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.pokemonCard) {
      this.store.dispatch(
        PokemonCardActions.addPokemonCard({
          pokemonCard: { ...this.pokemonCard },
        })
      );
    }
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
    if (this.loadDataSubscription) {
      this.loadDataSubscription.unsubscribe();
    }
  }
}
