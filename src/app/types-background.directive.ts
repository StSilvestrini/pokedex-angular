import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTypesBackground]',
})
export class TypesBackgroundDirective implements OnInit {
  @Input() type: string;
  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.color') textColor: string;

  constructor() {}

  ngOnInit(): void {
    switch (this.type) {
      case 'grass':
        this.backgroundColor = '#9bcc50';
        this.textColor = '#FFFFFF';
        break;
      case 'poison':
        this.backgroundColor = '#b97fc9';
        this.textColor = '#212121';
        break;
      case 'fire':
        this.backgroundColor = '#fd7d24';
        this.textColor = '#FFFFFF';
        break;
      case 'flying':
        this.backgroundColor = '#bdb9b8';
        this.textColor = '#212121';
        break;
      case 'water':
        this.backgroundColor = '#4592c4';
        this.textColor = '#FFFFFF';
        break;
      case 'bug':
        this.backgroundColor = '#729f3f';
        this.textColor = '#FFFFFF';
        break;
      default:
        this.backgroundColor = 'transparent';
        this.textColor = '#212121';
    }
  }
}
