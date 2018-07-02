import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRatingComponent } from './employee-rating.component';

describe('EmployeeRatingComponent', () => {
  let component: EmployeeRatingComponent;
  let fixture: ComponentFixture<EmployeeRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
