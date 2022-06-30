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
}
