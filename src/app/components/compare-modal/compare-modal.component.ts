import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { mergeMap, Subscription } from 'rxjs';
import { ArrayManipulationService } from 'src/app/services/arrayManipulation.service';
import { HttpPokedexService } from 'src/app/services/http.service';
import { StoreService } from 'src/app/services/store.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-compare-modal',
  templateUrl: './compare-modal.component.html',
  styleUrls: ['./compare-modal.component.scss'],
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
      .pipe(
        mergeMap((data) => {
          this.comparePokemons = [data?.pokemonCard, this.comparePokemons[1]];
          if (!data?.isInStore)
            this.storeService.dispatchPokemonCard(data.pokemonCard);
          return this.httpService.getPokemonCard(this?.comparePokemons?.[1]);
        })
      )
      .subscribe((data) => {
        if (!data?.isInStore)
          this.storeService.dispatchPokemonCard(data.pokemonCard);
        this.comparePokemons = [this.comparePokemons[0], data.pokemonCard];
        this.comparePokemons = this.comparePokemons.map((el, index) => {
          return {
            ...el,
            winningChances: this.getWinningChance(this.comparePokemons)?.[
              index
            ],
          };
        });
      });
  }

  getWinningChance = (pokemonsToCompare: any[]) => {
    const pokemonData = pokemonsToCompare.map((pokemon) => {
      const damage_relations = this.arrayManipulationService.getTypeProps(
        pokemon,
        'damage_relations'
      );
      return {
        types: this.arrayManipulationService.getTypeProps(pokemon, 'name'),
        damageRelations:
          this.arrayManipulationService.getDamageRelationsName(
            damage_relations
          ),
        baseExperience: pokemon?.base_experience,
      };
    });

    const totals: [number, number] = [
      this.utilityService.getTotal(
        pokemonData[0].damageRelations,
        pokemonData[0].baseExperience,
        pokemonData[1].types
      ),
      this.utilityService.getTotal(
        pokemonData[1].damageRelations,
        pokemonData[1].baseExperience,
        pokemonData[0].types
      ),
    ];
    return this.utilityService.getAverage(...totals);
  };

  onClose() {
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.httpService.unsubscribeImproved(this.compareSubscription);
  }
}
