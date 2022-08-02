import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesBackgroundDirective } from '../directives/types-background.directive';
import { CutListPipe } from '../pipes/cut-list.pipe';
import { FormatNumberPipe } from '../pipes/formatNumber.pipe';
import { ChartComponent } from '../components/chart/chart.component';
import { ChartModule } from 'angular2-chartjs';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TypesBackgroundDirective,
    CutListPipe,
    FormatNumberPipe,
    ChartComponent,
  ],
  imports: [CommonModule, ChartModule, FormsModule],
  exports: [
    CommonModule,
    TypesBackgroundDirective,
    CutListPipe,
    FormatNumberPipe,
    ChartComponent,
    ChartModule,
    FormsModule,
  ],
})
export class SharedModule {}
