import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CutListPipe } from '../pipes/cut-list.pipe';
import { FormatNumberPipe } from '../pipes/formatNumber.pipe';
import { ChartModule } from 'angular2-chartjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),
    HttpClientTestingModule,
    RouterTestingModule,
    BrowserAnimationsModule,
    ChartModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    StoreModule,
    HttpClientTestingModule,
    RouterTestingModule,
    BrowserAnimationsModule,
    ChartModule,
    SharedModule,
    FormsModule,
  ],
})
export class TestingModule {}
