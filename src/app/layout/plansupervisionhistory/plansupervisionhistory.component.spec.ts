import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSupervisionHistoryComponent } from './plansupervisionhistory.component';

describe('PlanSupervisionHistoryComponent', () => {
  let component: PlanSupervisionHistoryComponent;
  let fixture: ComponentFixture<PlanSupervisionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanSupervisionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanSupervisionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
