import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { CardNavigationComponent } from './card-navigation.component';
import { TestingModule } from 'src/app/shared/testing.module';

describe('CardNavigationComponent', () => {
  let component: CardNavigationComponent;
  let fixture: ComponentFixture<CardNavigationComponent>;

  const fakeActivatedRoute = {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
