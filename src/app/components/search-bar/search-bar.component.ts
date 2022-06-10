import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchQuery: string;
  @Output() searchPokemon = new EventEmitter<string>();
  @Output() clearPokemons = new EventEmitter<null>();
  @ViewChild('searchForm') searchForm: NgForm;

  onSubmit = () => {
    this.searchPokemon.emit(this.searchQuery);
    this.searchForm.reset();
  };

  onClear = () => {
    this.clearPokemons.emit();
    this.searchForm.reset();
  };
}
