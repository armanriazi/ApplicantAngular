import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDynamicComponent } from './grid-dynamic.component';

describe('GridDynamicComponent', () => {
  let component: GridDynamicComponent;
  let fixture: ComponentFixture<GridDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
