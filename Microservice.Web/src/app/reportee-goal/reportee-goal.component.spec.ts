import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteeGoalComponent } from './reportee-goal.component';

describe('ReporteeGoalComponent', () => {
  let component: ReporteeGoalComponent;
  let fixture: ComponentFixture<ReporteeGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteeGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteeGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
