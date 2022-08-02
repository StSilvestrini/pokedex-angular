import { Pipe, PipeTransform } from '@angular/core';
import { IPokemonCardList } from '../interfaces';

@Pipe({
  name: 'sortList',
})
export class SortListPipe implements PipeTransform {
  transform<T>(value: T[], sortBy: string): T[] {
    return value.sort((a: T, b: T) => a?.[sortBy] - b?.[sortBy]);
  }
}
