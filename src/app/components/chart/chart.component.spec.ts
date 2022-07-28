import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { TestingModule } from 'src/app/shared/testing.module';
import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartComponent],
      providers: [],
      imports: [TestingModule],
    });

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('showChart should be true after ngAfterContentChecked', () => {
    component.showChart = false;
    component.ngAfterContentChecked();
    expect(component.showChart).toBeTrue();
  });
  it('onResize should be called when screen resizing', () => {
    const spy = spyOn(component, 'onResize');
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalled();
  });
  it('onResize should not be called if screen is not resizing', () => {
    const spy = spyOn(component, 'onResize');
    expect(spy).not.toHaveBeenCalled();
  });
});
