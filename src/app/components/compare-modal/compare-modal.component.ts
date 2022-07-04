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
        // take(1)
      )
      .subscribe((data) => {
        if (!data?.isInStore)
          this.storeService.dispatchPokemonCard(data.pokemonCard);
        this.comparePokemons = [this.comparePokemons[0], data.pokemonCard];
        this.comparePokemons = this.comparePokemons.map((el, index) => {
          return { ...el, winningChances: this.getWinningChance()?.[index] };
        });
      });
  }

  getTotal = (damageRelationsArray, baseExperience, typeArray) => {
    damageRelationsArray.forEach((el) => {
      const firstKey = Object.keys(el)?.[0];
      switch (firstKey) {
        case 'double_damage_from':
          if (
            this.utilityService.hasCommonElement(
              el['double_damage_from'],
              typeArray
            )
          ) {
            baseExperience = baseExperience * 0.7;
          }
        case 'half_damage_from':
          if (
            this.utilityService.hasCommonElement(
              el['half_damage_from'],
              typeArray
            )
          ) {
            baseExperience = baseExperience * 1.2;
          }
        case 'no_damage_from':
          if (
            this.utilityService.hasCommonElement(
              el['no_damage_from'],
              typeArray
            )
          ) {
            baseExperience = baseExperience * 1.5;
          }
      }
    });
    return Math.round(baseExperience * 100) / 100;
  };

  getWinningChance = () => {
    const pokemonData = this.comparePokemons.map((pokemon) => {
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
        baseExperience: pokemon.base_experience,
      };
    });

    const totals: [number, number] = [
      this.getTotal(
        pokemonData[0].damageRelations,
        pokemonData[0].baseExperience,
        pokemonData[1].types
      ),
      this.getTotal(
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
