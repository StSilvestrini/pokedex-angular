import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { InferPluralPipe } from 'src/app/pipes/infer-plural.pipe';
import { HttpPokedexService } from 'src/app/services/http.service';
import { TestingModule } from 'src/app/shared/testing.module';
import { WindowRef } from 'src/app/shared/WindowRef';
import { CardNavigationComponent } from '../card-navigation/card-navigation.component';
import { PokemonStatsListComponent } from '../pokemon-stats-list-item/pokemon-stats-list.component';
import { PokemonCardComponent } from './pokemon-card.component';

describe('ChartComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: any;
  let route: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PokemonCardComponent,
        CardNavigationComponent,
        PokemonStatsListComponent,
        InferPluralPipe,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { pokemonId: 2 } },
            params: of({ pokemonId: 2 }),
          },
        },
        WindowRef,
      ],
      imports: [TestingModule],
    });

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('logo router link should be /', () => {
    expect(
      compiled
        .querySelector('.logoContainer > img')
        .getAttribute('ng-reflect-router-link')
    ).toBe('/');
  });
  it('card navigation should be present', () => {
    expect(compiled.querySelector('app-card-navigation')).toBeTruthy();
  });
  it('pokemon name should be displaied properly', () => {
    component.pokemonCard = {
      name: 'test',
      height: '',
      weight: '',
      id: 1,
      moves: [],
      abilities: [],
      types: [],
      base_experience: 1,
      stats: [],
      evolvesFrom: { id: '', image: '', name: '' },
    };
    fixture.detectChanges();
    expect(compiled.querySelector('.titleContainer > h1').textContent).toBe(
      'Test '
    );
  });
  it('pokemon number should be displaied properly', () => {
    component.pokemonCard = {
      name: 'test',
      height: '',
      weight: '',
      id: 1,
      moves: [],
      abilities: [],
      types: [],
      base_experience: 1,
      stats: [],
      evolvesFrom: { id: '', image: '', name: '' },
    };
    fixture.detectChanges();
    expect(
      compiled.querySelector('.titleContainer > h1:last-child').textContent
    ).toBe('N°001');
  });
  it('should render the correct card image', () => {
    component.pokemonCard = {
      name: 'test',
      height: '',
      weight: '',
      id: 1,
      moves: [],
      abilities: [],
      types: [],
      base_experience: 1,
      stats: [],
      evolvesFrom: { id: '', image: '', name: '' },
    };
    fixture.detectChanges();
    expect(compiled.querySelector('.cardImage').style['background-image']).toBe(
      'url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png")'
    );
  });
  it('should not render the card image if there is no pokemonCard.id', () => {
    expect(
      compiled.querySelector('.cardImage').style['background-image']
    ).toBeFalsy();
  });
  it('should render the correct weight', () => {
    component.pokemonCard = {
      name: 'test',
      height: '250',
      weight: '200',
      id: 1,
      moves: [],
      abilities: [],
      types: [],
      base_experience: 1,
      stats: [],
      evolvesFrom: { id: '', image: '', name: '' },
    };
    fixture.detectChanges();
    expect(
      compiled.querySelector('.cardContainer > li > div:last-child').textContent
    ).toContain('200');
  });
  it('should render the correct height', () => {
    component.pokemonCard = {
      name: 'test',
      height: '250',
      weight: '200',
      id: 1,
      moves: [],
      abilities: [],
      types: [],
      base_experience: 1,
      stats: [],
      evolvesFrom: { id: '', image: '', name: '' },
    };
    fixture.detectChanges();
    expect(
      compiled.querySelectorAll('.cardContainer > li > div:last-child')[1]
        .textContent
    ).toContain('250');
  });
  it('should be three app-pokemon-stats-list-item', () => {
    expect(
      compiled.querySelectorAll('app-pokemon-stats-list-item').length
    ).toBe(3);
  });
  it('should be one p tag for each weakness', () => {
    component.weaknesses = ['ice', 'fire', 'poison'];
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.typeToken').length).toBe(3);
  });
  it('should show the correct text in weakness section', () => {
    component.weaknesses = ['ice', 'fire', 'poison'];
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.typeToken')[0].textContent).toBe(
      ' Ice '
    );
    expect(compiled.querySelectorAll('.typeToken')[1].textContent).toBe(
      ' Fire '
    );
    expect(compiled.querySelectorAll('.typeToken')[2].textContent).toBe(
      ' Poison '
    );
  });
  it('weakness should have the apptypesbackground attribute', () => {
    component.weaknesses = ['ice', 'fire', 'poison'];
    fixture.detectChanges();
    expect(
      compiled.querySelector('.typeToken').getAttribute('apptypesbackground')
    ).not.toBeNull();
  });
  it('evolvesFrom should redirect to the correct link', () => {
    component.pokemonCard = {
      name: 'test',
      height: '250',
      weight: '200',
      id: 1,
      moves: [],
      abilities: [],
      types: [],
      base_experience: 1,
      stats: [],
      evolvesFrom: { id: '2', image: 'test', name: 'test' },
    };
    fixture.detectChanges();
    expect(
      compiled
        .querySelector('.evolvesFromContainer')
        .getAttribute('ng-reflect-router-link')
    ).toBe('/card,2');
  });
  it('should go to the second case if there is no name in the evolvesFrom object', () => {
    component.pokemonCard = {
      name: 'test',
      height: '250',
      weight: '200',
      id: 1,
      moves: [],
      abilities: [],
      types: [],
      base_experience: 1,
      stats: [],
      evolvesFrom: { id: '2', image: 'test', name: '' },
    };
    fixture.detectChanges();
    expect(compiled.querySelector('.evolvesFromContainer').textContent).toBe(
      ' First in the evolution chain '
    );
  });
  it('should go to the second case if there is no image in the evolvesFrom object', () => {
    component.pokemonCard = {
      name: 'test',
      height: '250',
      weight: '200',
      id: 1,
      moves: [],
      abilities: [],
      types: [],
      base_experience: 1,
      stats: [],
      evolvesFrom: { id: '2', image: '', name: 'test' },
    };
    fixture.detectChanges();
    expect(compiled.querySelector('.evolvesFromContainer').textContent).toBe(
      ' First in the evolution chain '
    );
  });

  it('should show the correct text if evolvesFrom object is correctly populated', () => {
    component.pokemonCard = {
      name: 'test',
      height: '250',
      weight: '200',
      id: 1,
      moves: [],
      abilities: [],
      types: [],
      base_experience: 1,
      stats: [],
      evolvesFrom: { id: '2', image: 'test', name: 'test' },
    };
    fixture.detectChanges();
    expect(compiled.querySelector('.evolvesFromContainer').textContent).toBe(
      'Evolves from: Test'
    );
  });
  it('should show the image of the evolvesFrom pokemon if the image is present', () => {
    component.pokemonCard = {
      name: 'test',
      height: '250',
      weight: '200',
      id: 1,
      moves: [],
      abilities: [],
      types: [],
      base_experience: 1,
      stats: [],
      evolvesFrom: { id: '2', image: 'test', name: 'test' },
    };
    fixture.detectChanges();
    expect(
      compiled.querySelector('.evolvesFromImage').style['background-image']
    ).toBe('url("test")');
  });
  it('The canva with the chart should be rendered', () => {
    expect(compiled.querySelector('#myChart')).toBeTruthy();
  });

  it('route params subscribe should be called onInit', () => {
    const spy = spyOn(route.params, 'subscribe');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
