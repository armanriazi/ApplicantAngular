import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPlanInformationComponent } from './gridplaninformation.component';

describe('GridPlanInformationComponent', () => {
  let component: GridPlanInformationComponent;
  let fixture: ComponentFixture<GridPlanInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPlanInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPlanInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
