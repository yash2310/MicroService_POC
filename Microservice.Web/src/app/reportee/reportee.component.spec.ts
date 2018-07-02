import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteeComponent } from './reportee.component';

describe('ReporteeComponent', () => {
  let component: ReporteeComponent;
  let fixture: ComponentFixture<ReporteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
