import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InferPluralPipe } from 'src/app/pipes/infer-plural.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { WindowRef } from 'src/app/shared/WindowRef';
import { CardNavigationComponent } from '../card-navigation/card-navigation.component';
import { PokemonStatsListComponent } from '../pokemon-stats-list-item/pokemon-stats-list.component';
import { PokemonCardComponent } from './pokemon-card.component';

@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonStatsListComponent,
    CardNavigationComponent,
    InferPluralPipe,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: PokemonCardComponent }]),
    SharedModule,
  ],
  providers: [WindowRef],
})
export class PokemonCardModule {}
