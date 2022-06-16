import { Component, OnInit } from '@angular/core';
import { IPokemonCard } from 'src/app/interfaces';
import { FormatService } from '../../services/format.service';
import { HttpPokedexService } from '../../services/http.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  constructor(
    private httpService: HttpPokedexService,
    private formatService: FormatService
  ) {}
  pokemonList: IPokemonCard[] = [];
  nextLink: string;

  expandArray = (res) => {
    let { errorManager, genericGetRequest } = this.httpService;
    res.results.forEach((result, index) => {
      if (result?.id) return;
      genericGetRequest(result?.url).subscribe({
        next: (card) => {
          res.results[index] = card;
        },
        error: errorManager,
      });
    });
    this.nextLink = res?.next;
    return res?.results;
  };

  ngOnInit(): void {
    let { requestList, errorManager } = this.httpService;

    this.httpService.getPokemonByTypes();
    requestList().subscribe({
      next: (res) => {
        this.pokemonList = this.expandArray(res);
      },
      error: errorManager,
    });
  }

  onLoadPokemon = () => {
    let {
      httpService: { genericGetRequest, errorManager },
      nextLink,
    } = this;
    genericGetRequest(nextLink).subscribe({
      next: (response) => {
        let newArray = [...this.pokemonList, ...response.results];
        this.pokemonList = this.expandArray({
          results: newArray,
          next: response.next,
        });
      },
      error: errorManager,
    });
  };

  getBackground(pokemon) {
    const image = this.pokemonList.find((pok) => pok?.name === pokemon?.name)
      ?.sprites?.front_default;
    if (!image) return;
    return { backgroundImage: `url(${image})` };
  }

  formatNumber = this.formatService.getPrettyNumber;
}
