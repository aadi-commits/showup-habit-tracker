import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayStatus } from './today-status';

describe('TodayStatus', () => {
  let component: TodayStatus;
  let fixture: ComponentFixture<TodayStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
