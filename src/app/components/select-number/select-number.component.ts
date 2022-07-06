import { Component, Input, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-select-number',
  templateUrl: './select-number.component.html',
  styleUrls: ['./select-number.component.scss'],
})
export class SelectNumberComponent implements OnDestroy {
  @Input() disabled: boolean;
  @Output() changeNumber = new Subject<number>();

  onChange(e) {
    this.changeNumber.next(e?.target?.value);
  }

  ngOnDestroy(): void {
    this.changeNumber?.unsubscribe();
  }
}
