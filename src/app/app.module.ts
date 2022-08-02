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
import { CompareModalComponent } from './components/compare-modal/compare-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [AppComponent, CompareModalComponent, AuthComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([PokemonListEffects]),
    StoreDevtoolsModule.instrument({ logOnly: false }),
    PokemonCardModule,
    PokemonListModule,
    SharedModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
