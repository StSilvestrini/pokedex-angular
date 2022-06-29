import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesBackgroundDirective } from '../types-background.directive';
import { CutListPipe } from '../pipes/cut-list.pipe';

@NgModule({
  declarations: [TypesBackgroundDirective, CutListPipe],
  imports: [CommonModule],
  exports: [CommonModule, TypesBackgroundDirective, CutListPipe],
})
export class SharedModule {}
