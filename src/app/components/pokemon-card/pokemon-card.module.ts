import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CutListPipe } from 'src/app/pipes/cut-list.pipe';
import { InferPluralPipe } from 'src/app/pipes/infer-plural.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardNavigationComponent } from '../card-navigation/card-navigation.component';
import { PokemonStatsListComponent } from '../pokemon-stats-list-item/pokemon-stats-list.component';
import { PokemonCardComponent } from './pokemon-card.component';

@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonStatsListComponent,
    CardNavigationComponent,
    InferPluralPipe,
    CutListPipe,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: PokemonCardComponent }]),
    SharedModule,
  ],
})
export class PokemonCardModule {}
