import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  getId = (index: number, item) => item?.id;
  getItem = (index: number, item) => item;

  getName(key) {
    return function (index: number, value: any): string {
      return value?.[key]?.name ? value?.[key]?.name : value?.name;
    };
  }

  getAverage = (a, b) => {
    return [Math.round((a / (a + b)) * 100), Math.round((b / (a + b)) * 100)];
  };

  hasCommonElement = (arr1, arr2) => arr1?.some((r) => arr2?.includes(r));
}
