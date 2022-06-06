import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HttpPokedexService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { TypesBackgroundDirective } from './types-background.directive';
import { PokemonStatsListComponent } from './pokemon-stats-list-item/pokemon-stats-list.component';
import { CardNavigationComponent } from './card-navigation/card-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonCardComponent,
    ErrorPageComponent,
    TypesBackgroundDirective,
    PokemonStatsListComponent,
    CardNavigationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
