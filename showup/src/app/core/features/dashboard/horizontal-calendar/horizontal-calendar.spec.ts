import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalCalendar } from './horizontal-calendar';

describe('HorizontalCalendar', () => {
  let component: HorizontalCalendar;
  let fixture: ComponentFixture<HorizontalCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
