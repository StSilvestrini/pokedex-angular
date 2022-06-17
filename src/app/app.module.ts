import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TypesBackgroundDirective } from './types-background.directive';
import { PokemonStatsListComponent } from './components/pokemon-stats-list-item/pokemon-stats-list.component';
import { CardNavigationComponent } from './components/card-navigation/card-navigation.component';
import { CutListPipe } from './pipes/cut-list.pipe';
import { InferPluralPipe } from './pipes/infer-plural.pipe';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { FilterListPipe } from './pipes/filterList.pipe';
import * as fromApp from './store/app.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PokemonListEffects } from './components/pokemon-list/store/pokemon-list.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonCardComponent,
    ErrorPageComponent,
    TypesBackgroundDirective,
    PokemonStatsListComponent,
    CardNavigationComponent,
    SearchBarComponent,
    CutListPipe,
    InferPluralPipe,
    FilterListPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([PokemonListEffects]),
    StoreDevtoolsModule.instrument({ logOnly: false }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
