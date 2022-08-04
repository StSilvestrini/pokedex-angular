import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TestingModule } from 'src/app/shared/testing.module';
import { SelectDimensionComponent } from './select-dimension.component';

describe('SelectDimensionComponent', () => {
  let component: SelectDimensionComponent;
  let fixture: ComponentFixture<SelectDimensionComponent>;
  let compiled: any;
  let select: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectDimensionComponent],
      providers: [],
      imports: [TestingModule],
    });

    fixture = TestBed.createComponent(SelectDimensionComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    select = compiled.querySelector('select');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be four options', () => {
    expect(compiled.querySelectorAll('#grids > option').length).toBe(4);
  });
  it('the regular option should be the selected', () => {
    expect(compiled.querySelector('[value="regular"]').selected).toBeTruthy();
  });
  it('the not regular options should not be selected', () => {
    expect(compiled.querySelector('[value="small"]').selected).toBeFalsy();
    expect(compiled.querySelector('[value="large"]').selected).toBeFalsy();
  });
  it('onChange should be called when onChange event', fakeAsync(() => {
    const spy = spyOn(component, 'onChange');
    select.value = select.options[2].value;
    select.dispatchEvent(new Event('change'));
    tick();
    expect(spy).toHaveBeenCalled();
  }));
  it('value should change onChange', () => {
    select.value = select.options[2].value;
    select.dispatchEvent(new Event('change'));
    expect(select.options[select.selectedIndex].label).toBe('Regular');
  });

  it('subject should be emitted when onChange is called', () => {
    let spy = spyOn(component.changeDimension, 'next');
    component.onChange('small');
    expect(spy).toHaveBeenCalled();
  });
});
