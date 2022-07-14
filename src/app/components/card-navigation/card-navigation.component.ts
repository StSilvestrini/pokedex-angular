import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpPokedexService } from 'src/app/services/http.service';
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
    private route: ActivatedRoute,
    private httpService: HttpPokedexService
  ) {}

  ngOnInit(): void {
    this.currentNumber = +this.route.snapshot.params['pokemonId'];
    this.routeSubscription = this.route.params.subscribe({
      next: (changes) => {
        this.currentNumber = +changes['pokemonId'];
      },
      error: (error) => this.httpService.errorManager(error),
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
