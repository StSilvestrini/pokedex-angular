import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPokemonCard } from 'src/app/interfaces';
import { FormatService } from '../../services/format.service';
import { HttpPokedexService } from '../../services/http.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  pokemonCard: IPokemonCard;

  constructor(
    private httpService: HttpPokedexService,
    private route: ActivatedRoute,
    private formatService: FormatService
  ) {}

  getPokemonCard = (pokemonId) => {
    const { requstSingleCard, errorManager } = this.httpService;
    requstSingleCard(pokemonId).subscribe({
      next: (res: IPokemonCard) => {
        this.pokemonCard = res;
      },
      error: errorManager,
    });
  };

  ngOnInit(): void {
    const pokemonId = this.route.snapshot.params['pokemonId'];
    this.getPokemonCard(pokemonId);
    this.route.params.subscribe((params) => {
      this.getPokemonCard(params['pokemonId']);
    });
  }

  formatNumber = this.formatService.getPrettyNumber;

  getBackground = (pokemonCard) => {
    if (!pokemonCard?.sprites?.front_default) return;
    return {
      backgroundImage: `url(${pokemonCard?.sprites?.front_default})`,
    };
  };
}
