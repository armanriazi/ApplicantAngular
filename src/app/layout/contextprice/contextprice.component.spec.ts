import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextPriceComponent } from './contextprice.component';

describe('ContextPriceComponent', () => {
  let component: ContextPriceComponent;
  let fixture: ComponentFixture<ContextPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
