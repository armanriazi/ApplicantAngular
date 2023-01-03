import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleDialogDynamicComponent } from './simple-dialog-dynamic.component';

describe('SimpleDialogDynamicComponent', () => {
  let component: SimpleDialogDynamicComponent;
  let fixture: ComponentFixture<SimpleDialogDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleDialogDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDialogDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
