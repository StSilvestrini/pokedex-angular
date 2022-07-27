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
    component.comparePokemons = [{ name: 'charmender' }, { name: 'bulbasaur' }];
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.pokemonName')[0].textContent).toContain(
      'Charmender'
    );
  });
  it('second pokemon name being showed properly', () => {
    component.comparePokemons = [{ name: 'charmender' }, { name: 'bulbasaur' }];
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.pokemonName')[1].textContent).toContain(
      'Bulbasaur'
    );
  });
  it('showing correct number of pokemonCard divs', () => {
    component.comparePokemons = [{ name: 'charmender' }, { name: 'bulbasaur' }];
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.pokemonCard').length).toBe(2);
  });
  it('chart rendered in the component', () => {
    expect(compiled.querySelectorAll('app-chart').length).toBe(1);
  });
});
