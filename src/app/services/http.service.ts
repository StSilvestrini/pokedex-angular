import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HttpPokedexService {
  constructor(private http: HttpClient) {}

  requestList = () => this.http.get<any>('https://pokeapi.co/api/v2/pokemon');

  requstSingleCard = (pokemonName) =>
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

  genericGetRequest = (url: string) => this.http.get<any>(url);

  errorManager = (error) => {
    throw Error(error.message);
  };
}
