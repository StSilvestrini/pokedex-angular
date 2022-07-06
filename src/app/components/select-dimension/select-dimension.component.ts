import { Component, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-select-dimension',
  templateUrl: './select-dimension.component.html',
  styleUrls: ['./select-dimension.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectDimensionComponent implements OnDestroy {
  @Output() changeDimension = new Subject<string>();

  onChange(e) {
    this.changeDimension.next(e?.target?.value);
  }

  ngOnDestroy(): void {
    this.changeDimension?.unsubscribe();
  }
}
