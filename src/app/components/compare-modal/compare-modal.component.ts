import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { mergeMap, Subscription, take } from 'rxjs';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';
import { HttpPokedexService } from 'src/app/services/http.service';
import { StoreService } from 'src/app/services/store.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-compare-modal',
  templateUrl: './compare-modal.component.html',
  styleUrls: ['./compare-modal.component.scss'],
  animations: [
    trigger('modalState', [
      state('in', style({})),
      transition('void => *', [
        style({
          transform: 'translateY(200px)',
        }),
        animate(500),
      ]),
    ]),
  ],
})
export class CompareModalComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Input() comparePokemons: any[];
  compareSubscription: Subscription;

  constructor(
    private httpService: HttpPokedexService,
    private storeService: StoreService,
    private arrayManipulationService: ArrayManipulationService,
    private utilityService: UtilitiesService
  ) {}

  ngOnInit() {
    this.compareSubscription = this.httpService
      .getPokemonCard(this?.comparePokemons?.[0])
      ?.pipe(
        mergeMap((data) => {
          this.comparePokemons = [data?.pokemonCard, this.comparePokemons[1]];
          if (!data?.isInStore)
            this.storeService.dispatchPokemonCard(data.pokemonCard);
          return this.httpService.getPokemonCard(this?.comparePokemons?.[1]);
        }),
        take(1)
      )
      .subscribe({
        next: (data) => {
          if (!data?.isInStore)
            this.storeService.dispatchPokemonCard(data?.pokemonCard);
          this.comparePokemons = [this.comparePokemons?.[0], data?.pokemonCard];
          this.comparePokemons = this.comparePokemons?.map((el, index) => {
            return {
              ...el,
              winningChances: this.getWinningChance(this.comparePokemons)?.[
                index
              ],
            };
          });
        },
        error: (error) => this.httpService.errorManager(error),
      });
  }

  getWinningChance = (pokemonsToCompare: any[]) => {
    const { getTotal, getAverage } = this.utilityService;
    const { getTypeProps, getDamageRelationsName } =
      this.arrayManipulationService;

    const pokemonData = pokemonsToCompare.map((pokemon) => {
      const damage_relations = getTypeProps(pokemon, 'damage_relations');
      return {
        types: getTypeProps(pokemon, 'name'),
        damageRelations: getDamageRelationsName(damage_relations),
        baseExperience: pokemon?.base_experience,
      };
    });

    const totals: [number, number] = [
      getTotal(pokemonData?.[0], pokemonData?.[1].types),
      getTotal(pokemonData?.[1], pokemonData?.[0].types),
    ];
    return getAverage(...totals);
  };

  onClose() {
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.httpService.unsubscribeImproved(this.compareSubscription);
  }
}
