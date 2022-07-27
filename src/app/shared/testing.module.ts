import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { TypesBackgroundDirective } from '../directives/types-background.directive';
import { CutListPipe } from '../pipes/cut-list.pipe';
import { FormatNumberPipe } from '../pipes/formatNumber.pipe';
import { ChartComponent } from '../components/chart/chart.component';
import { ChartModule } from 'angular2-chartjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TypesBackgroundDirective,
    CutListPipe,
    FormatNumberPipe,
    ChartComponent,
  ],
  imports: [
    StoreModule.forRoot({}),
    HttpClientTestingModule,
    RouterTestingModule,
    CommonModule,
    ChartModule,
  ],
  exports: [
    StoreModule,
    HttpClientTestingModule,
    RouterTestingModule,
    TypesBackgroundDirective,
    CutListPipe,
    FormatNumberPipe,
    ChartModule,
    ChartComponent,
  ],
})
export class TestingModule {}
