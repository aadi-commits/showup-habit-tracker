import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCheckin } from './daily-checkin';

describe('DailyCheckin', () => {
  let component: DailyCheckin;
  let fixture: ComponentFixture<DailyCheckin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyCheckin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyCheckin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
