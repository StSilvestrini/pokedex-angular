import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TestingModule } from 'src/app/shared/testing.module';
import { SelectNumberComponent } from './select-number.component';

describe('SelectNumberComponent', () => {
  let component: SelectNumberComponent;
  let fixture: ComponentFixture<SelectNumberComponent>;
  let compiled: any;
  let select: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectNumberComponent],
      providers: [],
      imports: [TestingModule],
    });

    fixture = TestBed.createComponent(SelectNumberComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    select = compiled.querySelector('select');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be four options', () => {
    expect(compiled.querySelectorAll('#numberToShow > option').length).toBe(4);
  });
  it('should the choose value be disabled', () => {
    expect(compiled.querySelector('[value="choose"]').disabled).toBeTruthy();
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
    expect(select.options[select.selectedIndex].label).toBe('50');
  });
  it('select disabled if property disable is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(select.disabled).toBeTrue();
  });
  it('select not disabled if property disable is false', () => {
    component.disabled = false;
    fixture.detectChanges();
    expect(select.disabled).toBeFalse();
  });
  it('subject should be emitted when onChange is called', () => {
    let spy = spyOn(component.changeNumber, 'next');
    component.onChange('20');
    expect(spy).toHaveBeenCalled();
  });
});
