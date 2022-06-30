import { getLocaleDayNames } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
@Component({
  selector: 'app-pokemon-stats-list-item',
  templateUrl: './pokemon-stats-list.component.html',
  styleUrls: ['./pokemon-stats-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PokemonStatsListComponent implements OnInit {
  @Input() list: { [key: string]: { name: string } }[];
  @Input() key: string;
  getProperName: (index: number, value: any) => string;
  constructor(private utilityService: UtilitiesService) {}

  ngOnInit(): void {
    this.getProperName = this.utilityService.getName(this?.key);
  }
}
