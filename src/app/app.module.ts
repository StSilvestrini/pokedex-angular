import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PokemonListEffects } from './components/pokemon-list/store/pokemon-list.effects';
import * as fromApp from './store/app.reducer';
import { PokemonCardModule } from './components/pokemon-card/pokemon-card.module';
import { PokemonListModule } from './components/pokemon-list/pokemon-list.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([PokemonListEffects]),
    StoreDevtoolsModule.instrument({ logOnly: false }),
    PokemonCardModule,
    PokemonListModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
