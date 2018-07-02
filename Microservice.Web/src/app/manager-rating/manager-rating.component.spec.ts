import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRatingComponent } from './manager-rating.component';

describe('ManagerRatingComponent', () => {
  let component: ManagerRatingComponent;
  let fixture: ComponentFixture<ManagerRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
