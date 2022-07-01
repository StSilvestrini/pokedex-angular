import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { mergeMap, Subscription, take } from 'rxjs';
import { HttpPokedexService } from 'src/app/services/http.service';
import { StoreService } from 'src/app/services/store.service';

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
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.compareSubscription = this.httpService
      .getPokemonCard(this?.comparePokemons?.[0])
      .pipe(
        mergeMap((data) => {
          this.comparePokemons = [data, this.comparePokemons[1]];
          if (!data?.isInStore)
            this.storeService.dispatchPokemonCard(data.pokemonCard);
          return this.httpService.getPokemonCard(this?.comparePokemons?.[1]);
        }),
        take(1)
      )
      .subscribe((data) => {
        if (!data?.isInStore)
          this.storeService.dispatchPokemonCard(data.pokemonCard);
        this.comparePokemons = [this.comparePokemons[0], data];
        console.log('this.comparePokemons', this.comparePokemons);
      });
  }

  onClose() {
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.httpService.unsubscribeImproved(this.compareSubscription);
  }
}
