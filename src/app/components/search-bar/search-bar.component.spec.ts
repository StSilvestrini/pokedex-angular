import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TestingModule } from 'src/app/shared/testing.module';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      providers: [],
      imports: [TestingModule],
    });

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onClear should be called when click on button', () => {
    const spy = spyOn(component, 'onClear');
    const button = compiled.querySelector('.buttons > button');
    button.click();
    expect(spy).toHaveBeenCalled();
  });
  it('input should be required', () => {
    const input = compiled.querySelector('input');
    expect(input.required).toBeTrue();
  });
  it('onSearch should be called on keyup', () => {
    const spy = spyOn(component, 'onSearch');
    const input = compiled.querySelector('input');
    input.dispatchEvent(new Event('keyup'));
    expect(spy).toHaveBeenCalled();
  });
  it('input value and searchQuery prop should be the same', fakeAsync(() => {
    component.searchQuery = 'test';
    const input = compiled.querySelector('input');
    fixture.detectChanges();
    tick();
    expect(input.value).toBe('test');
  }));
});
