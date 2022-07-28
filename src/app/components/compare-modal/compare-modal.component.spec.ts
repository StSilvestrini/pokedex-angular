import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpPokedexService } from 'src/app/services/http.service';

import { TestingModule } from 'src/app/shared/testing.module';
import { ChartComponent } from '../chart/chart.component';
import { CompareModalComponent } from './compare-modal.component';

describe('CompareModalComponent', () => {
  let component: CompareModalComponent;
  let fixture: ComponentFixture<CompareModalComponent>;
  let compiled: any;
  let httpService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompareModalComponent, ChartComponent],
      providers: [],
      imports: [TestingModule],
    });

    fixture = TestBed.createComponent(CompareModalComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    component.comparePokemons = [
      { name: 'charmender', id: 4 },
      { name: 'bulbasaur', id: 1 },
    ];

    httpService = TestBed.inject(HttpPokedexService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('compare subscription should be called after ngOnInit', () => {
    const spyRoute = spyOn(httpService, 'getPokemonCard');
    component.ngOnInit();
    expect(spyRoute).toHaveBeenCalled();
  });

  it('first pokemon name being showed properly', () => {
    expect(compiled.querySelectorAll('.pokemonName')[0].textContent).toContain(
      'Charmender'
    );
  });
  it('second pokemon name being showed properly', () => {
    expect(compiled.querySelectorAll('.pokemonName')[1].textContent).toContain(
      'Bulbasaur'
    );
  });
  it('showing correct number of pokemonCard divs', () => {
    expect(compiled.querySelectorAll('.pokemonCard').length).toBe(2);
  });
  it('chart rendered in the component', () => {
    expect(compiled.querySelectorAll('app-chart').length).toBe(1);
  });
  it('render the correct first pokemon image', () => {
    expect(
      compiled.querySelectorAll('.cardImage')[0].style['background-image']
    ).toContain('pokemon/4.png');
  });
  it('render the correct second pokemon image', () => {
    expect(
      compiled.querySelectorAll('.cardImage')[1].style['background-image']
    ).toContain('pokemon/1.png');
  });
  it('render the correct X image for onClose()', () => {
    expect(compiled.querySelector('.closeButton > img').src).toContain(
      'xSymbol.svg'
    );
  });
});
