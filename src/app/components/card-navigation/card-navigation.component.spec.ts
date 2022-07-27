import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { CardNavigationComponent } from './card-navigation.component';
import { TestingModule } from 'src/app/shared/testing.module';
import { of } from 'rxjs';

describe('CardNavigationComponent', () => {
  let component: CardNavigationComponent;
  let fixture: ComponentFixture<CardNavigationComponent>;
  let compiled: any;
  let route: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardNavigationComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { pokemonId: 2 } },
            params: of({ pokemonId: 2 }),
          },
        },
      ],
      imports: [TestingModule],
    });

    fixture = TestBed.createComponent(CardNavigationComponent);
    route = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('current number should be the same in the params', () => {
    expect(component.currentNumber).toBe(2);
  });

  it('should render the proper number of the left arrow', () => {
    expect(
      compiled.querySelector('.arrow > span:last-child').textContent
    ).toContain('001');
  });

  it('should render the proper number of the right arrow', () => {
    expect(compiled.querySelectorAll('.arrow')[1].textContent).toContain('003');
  });

  it('should not render the left arrow if pokemonId is <= 1', () => {
    component.currentNumber = 1;
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.arrow').length).toBe(1);
  });

  it('route subscription should be called after ngOnInit', () => {
    const spyRoute = spyOn(route.params, 'subscribe');
    component.ngOnInit();
    expect(spyRoute).toHaveBeenCalled();
  });

  it('route subscription should be called after ngOnInit', () => {
    const fakeFunc = (changes) => {
      component.currentNumber = changes;
    };
    const spyRoute = spyOn(route.params, 'subscribe').and.callFake(() => {
      fakeFunc(4);
    });
    component.ngOnInit();
    expect(component.currentNumber).toBe(4);
  });
});
