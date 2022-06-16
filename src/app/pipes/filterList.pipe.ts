import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList',
})
export class FilterListPipe implements PipeTransform {
  transform(value: any[], queryString: string, startSearch: number = 3): any[] {
    console.log(queryString);
    if (queryString && queryString.length && value && value.length) {
      return queryString?.length < startSearch
        ? value
        : value?.filter((pokemon) => pokemon?.name?.includes(queryString));
    }
    return value;
  }
}
