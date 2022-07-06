import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive';
import { FilterListPipe } from 'src/app/pipes/filterList.pipe';
import { SortListPipe } from 'src/app/pipes/sort.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SelectDimensionComponent } from '../select-dimension/select-dimension.component';
import { SelectNumberComponent } from '../select-number/select-number.component';
import { PokemonListComponent } from './pokemon-list.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    SearchBarComponent,
    SortListPipe,
    FilterListPipe,
    PlaceholderDirective,
    SelectDimensionComponent,
    SelectNumberComponent,
  ],
  imports: [RouterModule, FormsModule, SharedModule],
})
export class PokemonListModule {}
