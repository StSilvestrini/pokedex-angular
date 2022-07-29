import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inferPlural',
})
export class InferPluralPipe implements PipeTransform {
  transform(value: string): string {
    if (value?.[value?.length - 1] === 'y') {
      return value?.substring(0, value?.length - 1) + 'ies';
    } else {
      return value + 's';
    }
  }
}
