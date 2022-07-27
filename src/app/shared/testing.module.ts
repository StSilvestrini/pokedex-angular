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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [TypesBackgroundDirective, CutListPipe, FormatNumberPipe],
  imports: [
    StoreModule.forRoot({}),
    HttpClientTestingModule,
    RouterTestingModule,
    CommonModule,
    ChartModule,
    BrowserAnimationsModule,
  ],
  exports: [
    StoreModule,
    HttpClientTestingModule,
    RouterTestingModule,
    BrowserAnimationsModule,
    TypesBackgroundDirective,
    CutListPipe,
    FormatNumberPipe,
    ChartModule,
  ],
})
export class TestingModule {}
