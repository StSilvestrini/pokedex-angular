import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesBackgroundDirective } from '../directives/types-background.directive';
import { CutListPipe } from '../pipes/cut-list.pipe';
import { FormatNumberPipe } from '../pipes/formatNumber.pipe';

@NgModule({
  declarations: [TypesBackgroundDirective, CutListPipe, FormatNumberPipe],
  imports: [CommonModule],
  exports: [
    CommonModule,
    TypesBackgroundDirective,
    CutListPipe,
    FormatNumberPipe,
  ],
})
export class SharedModule {}
