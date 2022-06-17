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
  ngOnInit(): void {
    this.store.dispatch(new PokemonListActions.FetchPokemonListByType());
    this.store.dispatch(new PokemonListActions.FetchPokemonList());
  }
  constructor(private store: Store<fromApp.AppState>) {}
  title = 'pokedex-angular';
}
