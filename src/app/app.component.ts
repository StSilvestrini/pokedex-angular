import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as PokemonListActions from './components/pokemon-list/store/pokemon-list.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(PokemonListActions.fetchPokemonListByType());
    this.store.dispatch(PokemonListActions.fetchPokemonList());
  }
  title = 'pokedex-angular';
}
