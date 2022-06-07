import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormatService } from '../services/format.service';

@Component({
  selector: 'app-card-navigation',
  templateUrl: './card-navigation.component.html',
  styleUrls: ['./card-navigation.component.scss'],
})
export class CardNavigationComponent implements OnInit {
  currentNumber: number;
  constructor(
    private formatService: FormatService,
    private route: ActivatedRoute
  ) {}

  formatNumber = this.formatService.getPrettyNumber;

  ngOnInit(): void {
    this.currentNumber = Number(this.route.snapshot.params['pokemonId']);
    this.route.params.subscribe((changes) => {
      this.currentNumber = Number(changes['pokemonId']);
    });
  }
}
