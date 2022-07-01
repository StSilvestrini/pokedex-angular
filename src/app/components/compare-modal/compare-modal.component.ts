import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-compare-modal',
  templateUrl: './compare-modal.component.html',
  styleUrls: ['./compare-modal.component.scss'],
})
export class CompareModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() comparePokemons: any[];

  onClose() {
    this.close.emit();
  }
}
