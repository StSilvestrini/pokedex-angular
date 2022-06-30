import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-card-navigation',
  templateUrl: './card-navigation.component.html',
  styleUrls: ['./card-navigation.component.scss'],
})
export class CardNavigationComponent implements OnInit, OnDestroy {
  currentNumber: number;
  routeSubscription: Subscription;
  constructor(
    private utilityService: UtilitiesService,
    private route: ActivatedRoute
  ) {}

  formatNumber = this.utilityService.getPrettyNumber;

  ngOnInit(): void {
    this.currentNumber = +this.route.snapshot.params['pokemonId'];
    this.routeSubscription = this.route.params.subscribe((changes) => {
      this.currentNumber = +changes['pokemonId'];
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
