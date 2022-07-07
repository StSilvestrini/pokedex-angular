import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesBackgroundDirective } from '../directives/types-background.directive';
import { CutListPipe } from '../pipes/cut-list.pipe';
import { FormatNumberPipe } from '../pipes/formatNumber.pipe';
import { ChartComponent } from '../components/chart/chart.component';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [
    TypesBackgroundDirective,
    CutListPipe,
    FormatNumberPipe,
    ChartComponent,
  ],
  imports: [CommonModule, ChartModule],
  exports: [
    CommonModule,
    TypesBackgroundDirective,
    CutListPipe,
    FormatNumberPipe,
    ChartComponent,
    ChartModule,
  ],
})
export class SharedModule {}
