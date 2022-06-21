import { Pipe, PipeTransform } from '@angular/core';
import { IPokemonCardList } from '../interfaces';

@Pipe({
  name: 'sortList',
})
export class SortListPipe implements PipeTransform {
  transform(value: any[], sortBy: string): IPokemonCardList[] {
    return value.sort(
      (a: IPokemonCardList, b: IPokemonCardList) => a?.[sortBy] - b?.[sortBy]
    );
  }
}
