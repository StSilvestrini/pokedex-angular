import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesBackgroundDirective } from '../types-background.directive';

@NgModule({
  declarations: [TypesBackgroundDirective],
  imports: [CommonModule],
  exports: [CommonModule, TypesBackgroundDirective],
})
export class SharedModule {}
