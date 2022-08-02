import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypesBackgroundDirective } from './types-background.directive';

@Component({
  template: `<i appTypesBackground></i>
    <div appTypesBackground type="poison"></div>`,
})
class TestComponent {}

describe('StaredDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementI: HTMLElement;
  let elementDiv: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, TypesBackgroundDirective],
    }).createComponent(TestComponent);
    elementI = fixture.nativeElement.querySelector('i');
    elementDiv = fixture.nativeElement.querySelector('div');

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new TypesBackgroundDirective();
    expect(directive).toBeTruthy();
  });

  it('should display the default background', () => {
    expect(elementI.style.background).toEqual('transparent');
  });
  it('should display the default color', () => {
    expect(elementI.style.color).toEqual('rgb(33, 33, 33)');
  });
  it('should display the correct background', () => {
    expect(elementDiv.style.background).toEqual('rgb(185, 127, 201)');
  });
  it('should display the correct color', () => {
    expect(elementDiv.style.color).toEqual('rgb(33, 33, 33)');
  });
});
