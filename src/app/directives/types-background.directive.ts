import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTypesBackground]',
})
export class TypesBackgroundDirective implements OnInit {
  @Input() type: string;
  @HostBinding('style.background') backgroundColor: string;
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
        this.backgroundColor =
          'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)';
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
      case 'ice':
        this.backgroundColor = '#51c4e7';
        this.textColor = '#FFFFFF';
        break;
      case 'psychic':
        this.backgroundColor = '#f366b9';
        this.textColor = '#FFFFFF';
        break;
      case 'ground':
        this.backgroundColor =
          'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)';
        this.textColor = '#FFFFFF';
        break;
      case 'rock':
        this.backgroundColor = '#a38c21';
        this.textColor = '#FFFFFF';
        break;
      case 'normal':
        this.backgroundColor = '#a4acaf';
        this.textColor = '#212121';
        break;
      case 'electric':
        this.backgroundColor = '#eed535';
        this.textColor = '#212121';
        break;
      case 'fairy':
        this.backgroundColor = '#fdb9e9';
        this.textColor = '#212121';
        break;
      case 'fighting':
        this.backgroundColor = '#d56723';
        this.textColor = '#FFF';
        break;
      case 'steel':
        this.backgroundColor = '#9eb7b8';
        this.textColor = '#212121';
        break;
      case 'ghost':
        this.backgroundColor = '#7b62a3';
        this.textColor = '#FFF';
        break;
      case 'dragon':
        this.backgroundColor =
          'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)';
        this.textColor = '#FFF';
        break;
      case 'dark':
        this.backgroundColor = '#707070';
        this.textColor = '#FFF';
        break;
      default:
        this.backgroundColor = 'transparent';
        this.textColor = '#212121';
    }
  }
}
