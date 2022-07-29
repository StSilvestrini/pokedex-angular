import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InferPluralPipe } from 'src/app/pipes/infer-plural.pipe';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { TestingModule } from 'src/app/shared/testing.module';
import { PokemonStatsListComponent } from './pokemon-stats-list.component';

describe('PokemonStatsListComponent', () => {
  let component: PokemonStatsListComponent;
  let fixture: ComponentFixture<PokemonStatsListComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonStatsListComponent, InferPluralPipe],
      providers: [],
      imports: [TestingModule],
    });

    fixture = TestBed.createComponent(PokemonStatsListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('getName called onInit', () => {
    const utilityService = TestBed.inject(UtilitiesService);
    const spy = spyOn(utilityService, 'getName');
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
  it('key should be rendered uppercase and plural', () => {
    component.key = 'test';
    fixture.detectChanges();
    expect(compiled.querySelector('.statName').textContent).toBe('Tests');
  });
  it('key should be rendered uppercase and plural in case end with "y"', () => {
    component.key = 'ability';
    fixture.detectChanges();
    expect(compiled.querySelector('.statName').textContent).toBe('Abilities');
  });
  it('should be the correct amount of elements rendered', () => {
    component.list = [{}, {}, {}];
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.flex-item > p').length).toBe(3);
  });
  it('should render no element if list is empty', () => {
    expect(compiled.querySelectorAll('.flex-item > p').length).toBe(0);
  });
  it('background should be transparent and color black if there is no known key', () => {
    component.list = [{}, {}, {}];
    fixture.detectChanges();
    expect(compiled.querySelector('.flex-item > p').style.backgroundColor).toBe(
      'transparent'
    );
    expect(compiled.querySelector('.flex-item > p').style.color).toBe(
      'rgb(33, 33, 33)'
    );
  });
  it('background and color should vary according to the type', () => {
    component.list = [
      { type: { name: 'ice' } },
      { type: { name: 'fire' } },
      { type: { name: 'poison' } },
    ];
    component.key = 'type';
    fixture.detectChanges();
    expect(compiled.querySelector('.flex-item > p').style.backgroundColor).toBe(
      'rgb(81, 196, 231)'
    );
    expect(compiled.querySelector('.flex-item > p').style.color).toBe(
      'rgb(255, 255, 255)'
    );
    expect(
      compiled.querySelectorAll('.flex-item > p')[1].style.backgroundColor
    ).toBe('rgb(253, 125, 36)');
    expect(compiled.querySelectorAll('.flex-item > p')[1].style.color).toBe(
      'rgb(255, 255, 255)'
    );
    expect(
      compiled.querySelectorAll('.flex-item > p')[2].style.backgroundColor
    ).toBe('rgb(185, 127, 201)');
    expect(compiled.querySelectorAll('.flex-item > p')[2].style.color).toBe(
      'rgb(33, 33, 33)'
    );
  });
  it('type should be showed correctly if key is "type" ', () => {
    component.list = [{ type: { name: 'ice' } }];
    component.key = 'type';
    fixture.detectChanges();
    expect(compiled.querySelector('.flex-item > p').textContent).toContain(
      'Ice'
    );
  });
  it('type should be showed correctly when key which are not present', () => {
    component.list = [{ name: 'test' }];
    fixture.detectChanges();
    expect(compiled.querySelector('.flex-item > p').textContent).toContain(
      'Test'
    );
  });
  it('type should be showed correctly for key which are not "type"', () => {
    component.list = [{ name: 'test' }];
    component.key = 'test';
    fixture.detectChanges();
    expect(compiled.querySelector('.flex-item > p').textContent).toContain(
      'Test'
    );
  });
  it('class typeToken should be applied if key is equal to "type"', () => {
    component.list = [{ name: 'test' }];
    component.key = 'type';
    fixture.detectChanges();
    expect(compiled.querySelector('.flex-item > p').classList).toContain(
      'typeToken'
    );
  });
  it('class typeToken should not be applied if key is not equal to "type"', () => {
    component.list = [{ name: 'test' }];
    component.key = 'not type';
    fixture.detectChanges();
    expect(
      compiled.querySelector('.flex-item > p').classList.contains('typeToken')
    ).toBeFalsy();
  });
  it('type attribute should be showed correctly with key "type"', () => {
    component.list = [{ type: { name: 'ice' } }];
    component.key = 'type';
    fixture.detectChanges();
    expect(
      compiled.querySelector('.flex-item > p').getAttribute('ng-reflect-type')
    ).toBe('ice');
  });
  it('type attribute should be null with key which is not "type"', () => {
    component.list = [{ name: 'ice' }];
    component.key = 'not type';
    fixture.detectChanges();
    expect(
      compiled.querySelector('.flex-item > p').getAttribute('ng-reflect-type')
    ).toBeNull();
  });
  it('apptypesbackground should be present on the html p tag', () => {
    component.list = [{ name: 'ice' }];
    component.key = 'not type';
    fixture.detectChanges();
    expect(
      compiled
        .querySelector('.flex-item > p')
        .getAttribute('apptypesbackground')
    ).not.toBeNull();
  });
});
