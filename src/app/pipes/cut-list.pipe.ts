import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutList',
})
export class CutListPipe implements PipeTransform {
  transform(value: any[], cuttingPoint: number = 10): any[] {
    return value.length > cuttingPoint ? value.slice(0, cuttingPoint) : value;
  }
}
