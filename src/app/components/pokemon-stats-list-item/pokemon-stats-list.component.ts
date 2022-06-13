import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pokemon-stats-list-item',
  templateUrl: './pokemon-stats-list.component.html',
  styleUrls: ['./pokemon-stats-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PokemonStatsListComponent {
  @Input() list: { [key: string]: { name: string } }[];
  @Input() key: string;
}