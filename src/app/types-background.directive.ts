import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTypesBackground]',
})
export class TypesBackgroundDirective implements OnInit {
  @Input() type: string;
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor() {}

  ngOnInit(): void {
    switch (this.type) {
      case 'grass':
        this.backgroundColor = '#9bcc50';
        break;
      case 'poison':
        this.backgroundColor = '#b97fc9';
        break;
      case 'fire':
        this.backgroundColor = '#fd7d24';
        break;
      case 'flying':
        this.backgroundColor = '#bdb9b8';
        break;
      case 'water':
        this.backgroundColor = '#4592c4';
        break;
      case 'bug':
        this.backgroundColor = '#729f3f';
        break;
      default:
        this.backgroundColor = 'transparent';
    }
  }
}
