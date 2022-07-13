import { Pipe, PipeTransform } from '@angular/core';
import { IPokemonCardList } from '../interfaces';

@Pipe({
  name: 'noResultsManager',
})
export class NoResultsManagerPipe implements PipeTransform {
  transform(value: IPokemonCardList[]): unknown {
    console.log('value', value);
    return value?.length ? [{ name: 'No results' }] : value;
  }
}
