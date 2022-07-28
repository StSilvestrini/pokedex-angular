import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from 'src/app/shared/testing.module';
import { ErrorPageComponent } from './error-page.component';

describe('ChartComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorPageComponent],
      providers: [],
      imports: [TestingModule],
    });

    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the proper test', () => {
    expect(compiled.querySelector('h2').textContent).toBe('Page not found');
  });
});
