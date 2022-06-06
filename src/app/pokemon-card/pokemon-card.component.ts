import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpPokedexService } from '../services/http.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  pokemonCard: any;

  constructor(
    private httpService: HttpPokedexService,
    private route: ActivatedRoute
  ) {}

  getPokemonCard = (pokemonName) => {
    const { requstSingleCard, errorManager } = this.httpService;

    requstSingleCard(pokemonName).subscribe({
      next: (res) => {
        this.pokemonCard = res;
      },
      error: errorManager,
    });
  };

  ngOnInit(): void {
    const pokemonName = this.route.snapshot.params['pokemonName'];
    this.getPokemonCard(pokemonName);

    this.route.params.subscribe((params) => {
      this.getPokemonCard(params['pokemonName']);
    });
  }
}
