import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { CardNavigationComponent } from './card-navigation.component';
import { TestingModule } from 'src/app/shared/testing.module';

describe('CardNavigationComponent', () => {
  let component: CardNavigationComponent;
  let fixture: ComponentFixture<CardNavigationComponent>;
  let compiled: any;

  let fakeActivatedRoute: any = {
    snapshot: { params: { pokemonId: 2 } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardNavigationComponent],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
      imports: [TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardNavigationComponent);
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
});
