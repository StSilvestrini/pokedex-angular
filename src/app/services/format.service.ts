import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormatService {
  getPrettyNumber = (pokemonNumber: number) =>
    pokemonNumber?.toString().padStart(3, '0');
}
