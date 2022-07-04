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

  getAverage = (a, b) => [
    Math.round((a / (a + b)) * 100),
    Math.round((b / (a + b)) * 100),
  ];

  hasCommonElement = (arr1, arr2) => arr1?.some((r) => arr2?.includes(r));

  getTotal = (damageRelationsArray, baseExperience, typeArray) => {
    damageRelationsArray.forEach((el) => {
      const firstKey = Object.keys(el)?.[0];
      switch (firstKey) {
        case 'double_damage_from':
          if (this.hasCommonElement(el['double_damage_from'], typeArray)) {
            baseExperience = baseExperience * 0.7;
          }
        case 'half_damage_from':
          if (this.hasCommonElement(el['half_damage_from'], typeArray)) {
            baseExperience = baseExperience * 1.2;
          }
        case 'no_damage_from':
          if (this.hasCommonElement(el['no_damage_from'], typeArray)) {
            baseExperience = baseExperience * 1.5;
          }
      }
    });
    return Math.round(baseExperience * 100) / 100;
  };
}
