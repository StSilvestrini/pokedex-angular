import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TypesBackgroundDirective } from './types-background.directive';
import { PokemonStatsListComponent } from './pokemon-stats-list-item/pokemon-stats-list.component';
import { CardNavigationComponent } from './card-navigation/card-navigation.component';
import { CutListPipe } from './pipes/cut-list.pipe';
import { InferPluralPipe } from './pipes/infer-plural.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonCardComponent,
    ErrorPageComponent,
    TypesBackgroundDirective,
    PokemonStatsListComponent,
    CardNavigationComponent,
    CutListPipe,
    InferPluralPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
