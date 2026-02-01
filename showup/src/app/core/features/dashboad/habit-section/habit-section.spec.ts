import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitSection } from './habit-section';

describe('HabitSection', () => {
  let component: HabitSection;
  let fixture: ComponentFixture<HabitSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
