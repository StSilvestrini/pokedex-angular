import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FilterListPipe } from 'src/app/pipes/filterList.pipe';
import { SortListPipe } from 'src/app/pipes/sort.pipe';
import { TestingModule } from 'src/app/shared/testing.module';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SelectDimensionComponent } from '../select-dimension/select-dimension.component';
import { SelectNumberComponent } from '../select-number/select-number.component';
import { PokemonListComponent } from './pokemon-list.component';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PokemonListComponent,
        SearchBarComponent,
        SelectDimensionComponent,
        SelectNumberComponent,
        SortListPipe,
        FilterListPipe,
      ],
      providers: [],
      imports: [TestingModule],
    });

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be one search bar in the header', () => {
    expect(
      compiled.querySelectorAll('.listHeader > app-search-bar').length
    ).toBe(1);
  });
  it('should be one select dimension in the header', () => {
    expect(
      compiled.querySelectorAll('.listHeader > app-select-dimension').length
    ).toBe(1);
  });
  it('should be one select number in the header', () => {
    expect(
      compiled.querySelectorAll('.listHeader > app-select-number').length
    ).toBe(1);
  });
  it('onChangeDimension should be called when change dimension', () => {
    const spy = spyOn(component, 'onChangeDimension');
    const element = compiled.querySelector(
      '.listHeader > app-select-dimension'
    );
    element.dispatchEvent(new Event('changeDimension'));
    expect(spy).toHaveBeenCalled();
  });
  it('onNumberChange should be called when change number', () => {
    const spy = spyOn(component, 'onNumberChange');
    const element = compiled.querySelector('.listHeader > app-select-number');
    element.dispatchEvent(new Event('changeNumber'));
    expect(spy).toHaveBeenCalled();
  });
  it('onNumberChange should be called when change number', () => {
    component.pokemonList = [
      { image: '', id: 1, url: '', name: 'test1' },
      { image: '', id: 2, url: '', name: 'test2' },
      { image: '', id: 3, url: '', name: 'test3' },
    ];
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.cardContainer').length).toBe(3);
  });
  it('onSelectCompare should have been called if compare mode is true and click event happens ', () => {
    component.pokemonList = [
      { image: '1', id: 1, url: '1', name: 'test1' },
      { image: '2', id: 2, url: '2', name: 'test2' },
      { image: '3', id: 3, url: '3', name: 'test3' },
    ];
    component.compareMode = true;
    fixture.detectChanges();
    const element = compiled.querySelector('.cardContainer');
    const spy = spyOn(component, 'onSelectCompare');
    element.click();
    expect(spy).toHaveBeenCalled();
  });
  it('onSelectCompare should not have been called if compare mode is false and click event happens ', () => {
    component.pokemonList = [
      { image: '1', id: 1, url: '1', name: 'test1' },
      { image: '2', id: 2, url: '2', name: 'test2' },
      { image: '3', id: 3, url: '3', name: 'test3' },
    ];
    component.compareMode = false;
    fixture.detectChanges();
    const element = compiled.querySelector('.cardContainer');
    const spy = spyOn(component, 'onSelectCompare');
    element.click();
    expect(spy).not.toHaveBeenCalled();
  });
  it('router-link should be present when compare mode is false', () => {
    component.pokemonList = [
      { image: '1', id: 1, url: '1', name: 'test1' },
      { image: '2', id: 2, url: '2', name: 'test2' },
      { image: '3', id: 3, url: '3', name: 'test3' },
    ];
    component.compareMode = false;
    fixture.detectChanges();
    const element = compiled.querySelector('.cardContainer');
    expect(element.getAttribute('ng-reflect-router-link')).toBe('/card,1');
  });
  it('router-link should be null when compare mode is true', () => {
    component.pokemonList = [
      { image: '1', id: 1, url: '1', name: 'test1' },
      { image: '2', id: 2, url: '2', name: 'test2' },
      { image: '3', id: 3, url: '3', name: 'test3' },
    ];
    component.compareMode = true;
    fixture.detectChanges();
    const element = compiled.querySelector('.cardContainer');
    expect(element.getAttribute('ng-reflect-router-link')).toBeNull();
  });
  it('router-link should be null when compare mode is true', () => {
    component.pokemonList = [
      { image: '1', id: 1, url: '1', name: 'test1' },
      { image: '2', id: 2, url: '2', name: 'test2' },
      { image: '3', id: 3, url: '3', name: 'test3' },
    ];
    component.compareMode = true;
    fixture.detectChanges();
    const element = compiled.querySelector('.cardContainer');
    expect(element.classList).toContain('cardContainerCompare');
  });
  it('twoGrids class should be applied if gridLayout is large', () => {
    component.pokemonList = [
      { image: '1', id: 1, url: '1', name: 'test1' },
      { image: '2', id: 2, url: '2', name: 'test2' },
      { image: '3', id: 3, url: '3', name: 'test3' },
    ];
    component.gridLayout = 'large';
    fixture.detectChanges();
    const element = compiled.querySelector('.cardContainer');
    expect(element.classList).toContain('twoGrids');
  });
  it('fourGrids class should be applied if gridLayout is small', () => {
    component.pokemonList = [
      { image: '1', id: 1, url: '1', name: 'test1' },
      { image: '2', id: 2, url: '2', name: 'test2' },
      { image: '3', id: 3, url: '3', name: 'test3' },
    ];
    component.gridLayout = 'small';
    fixture.detectChanges();
    const element = compiled.querySelector('.cardContainer');
    expect(element.classList).toContain('fourGrids');
  });
  it('threeGrids class should be applied if gridLayout is not small nor large', () => {
    component.pokemonList = [
      { image: '1', id: 1, url: '1', name: 'test1' },
      { image: '2', id: 2, url: '2', name: 'test2' },
      { image: '3', id: 3, url: '3', name: 'test3' },
    ];
    fixture.detectChanges();
    const element = compiled.querySelector('.cardContainer');
    expect(element.classList).toContain('threeGrids');
  });
  it('cardContainerSelected class should be applied if isSelected returns true', () => {
    component.pokemonList = [
      { image: '1', id: 1, url: '1', name: 'test1' },
      { image: '2', id: 2, url: '2', name: 'test2' },
      { image: '3', id: 3, url: '3', name: 'test3' },
    ];
    component.isSelected = () => true;
    fixture.detectChanges();
    const element = compiled.querySelector('.cardContainer');
    expect(element.classList).toContain('cardContainerSelected');
  });
  it('background image of cardImage element should containe the image of the pokemon', () => {
    component.pokemonList = [
      { image: 'test1', id: 1, url: '1', name: 'test1' },
      { image: 'test2', id: 2, url: '2', name: 'test2' },
      { image: 'test3', id: 3, url: '3', name: 'test3' },
    ];
    fixture.detectChanges();
    const element = compiled.querySelector('.cardImage');
    expect(element.style['background-image']).toContain('test1');
  });
  it('number of the pokemon should be displayed correctly', () => {
    component.pokemonList = [
      { image: 'test1', id: 1, url: '1', name: 'test1' },
      { image: 'test2', id: 2, url: '2', name: 'test2' },
      { image: 'test3', id: 3, url: '3', name: 'test3' },
    ];
    fixture.detectChanges();
    const element = compiled.querySelector('.pokemonNumber');
    expect(element.textContent).toContain('001');
  });
  it('name of the pokemon should be displayed correctly', () => {
    component.pokemonList = [
      { image: 'test1', id: 1, url: '1', name: 'bulbasaur' },
      { image: 'test2', id: 2, url: '2', name: 'ivysaur' },
      { image: 'test3', id: 3, url: '3', name: 'venusaur' },
    ];
    fixture.detectChanges();
    const element = compiled.querySelector('.pokemonName');
    expect(element.textContent).toContain('Bulbasaur');
  });
  it('type of the pokemon should be displayed correctly', () => {
    component.pokemonList = [
      {
        image: 'test1',
        id: 1,
        url: '1',
        name: 'bulbasaur',
        types: ['grass', 'poison'],
      },
      { image: 'test2', id: 2, url: '2', name: 'ivysaur' },
      { image: 'test3', id: 3, url: '3', name: 'venusaur' },
    ];
    fixture.detectChanges();
    const element = compiled.querySelector('.pokemonType');
    expect(element.textContent).toContain('Grass');
  });
  it('types of the pokemon should be the correct number', () => {
    component.pokemonList = [
      {
        image: 'test1',
        id: 1,
        url: '1',
        name: 'bulbasaur',
        types: ['grass', 'poison'],
      },
    ];
    fixture.detectChanges();
    const element = compiled.querySelectorAll('.pokemonType > p');
    expect(element.length).toBe(2);
  });
  it('types of the pokemon should be the correct number', () => {
    component.pokemonList = [
      {
        image: 'test1',
        id: 1,
        url: '1',
        name: 'bulbasaur',
        types: ['grass', 'poison'],
      },
    ];
    fixture.detectChanges();
    const element = compiled.querySelector('.pokemonType > p');
    expect(element.getAttribute('apptypesbackground')).not.toBeNull();
  });
  it('onCompare should be called when clicking on compare button', () => {
    const element = compiled.querySelector('.compareButton');
    const spy = spyOn(component, 'onCompare');
    element.click();
    expect(spy).toHaveBeenCalled();
  });
  it('onCompare button should display the correct text when compareMode is true', () => {
    component.compareMode = true;
    fixture.detectChanges();
    const element = compiled.querySelector('.compareButton');
    expect(element.textContent).toBe(' Quit ');
  });
  it('onCompare button should display the correct text when compareMode is false', () => {
    const element = compiled.querySelector('.compareButton');
    expect(element.textContent).toBe(' Compare ');
  });
  it('select number should not be disabled if search query is longer than 2', () => {
    fixture.debugElement.query(
      By.directive(SearchBarComponent)
    ).componentInstance.searchQuery = 'aaaa';
    fixture.detectChanges();
    expect(
      compiled
        .querySelector('app-select-number')
        .getAttribute('ng-reflect-disabled')
    ).toBe('true');
  });
  it('select number should be disabled if search query is longer than 2', () => {
    fixture.debugElement.query(
      By.directive(SearchBarComponent)
    ).componentInstance.searchQuery = 'aa';
    fixture.detectChanges();
    expect(
      compiled
        .querySelector('app-select-number')
        .getAttribute('ng-reflect-disabled')
    ).toBe('false');
  });
  it('onLoad button should be disabled if search query is longer than 2', () => {
    fixture.debugElement.query(
      By.directive(SearchBarComponent)
    ).componentInstance.searchQuery = 'aaaa';
    fixture.detectChanges();
    expect(
      compiled.querySelector('.buttonContainer > button').disabled
    ).toBeTrue();
  });
  it('onLoad button should not be disabled if search query is shorter than 2', () => {
    fixture.debugElement.query(
      By.directive(SearchBarComponent)
    ).componentInstance.searchQuery = 'aa';
    fixture.detectChanges();
    expect(
      compiled.querySelector('.buttonContainer > button').disabled
    ).toBeFalse();
  });
  it('onLoad button should have enabled class if search query is shorter than 2', () => {
    fixture.debugElement.query(
      By.directive(SearchBarComponent)
    ).componentInstance.searchQuery = 'aa';
    fixture.detectChanges();
    expect(
      compiled.querySelector('.buttonContainer > button').classList
    ).toContain('enabled');
  });
  it('onLoad button should not have enabled class if search query is longer than 2', () => {
    fixture.debugElement.query(
      By.directive(SearchBarComponent)
    ).componentInstance.searchQuery = 'aaaa';
    fixture.detectChanges();
    expect(
      compiled.querySelector('.buttonContainer > button').classList
    ).not.toContain('enabled');
  });
});
