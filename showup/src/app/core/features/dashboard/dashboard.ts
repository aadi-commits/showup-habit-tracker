import { Component, OnInit } from '@angular/core';
import { HorizontalCalendar } from './horizontal-calendar/horizontal-calendar';
import { TodayStatus } from './today-status/today-status';
import { DailyCheckin } from './daily-checkin/daily-checkin';
import { Showup } from '../../services/showup';
import { HabitSection } from "../dashboad/habit-section/habit-section";

@Component({
  selector: 'app-dashboard',
  imports: [HorizontalCalendar, TodayStatus, DailyCheckin, HabitSection],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly HABIT_STATE_KEY = 'daily_habits_persistent';
  private readonly LAST_OPEN_DATE_KEY = 'last_habit_open_date';
  selectedDate!: Date;
  completedDates: string[] = [
    // example
    // '2026-01-14',
  ];

  dailyBasics = [
    { id: 'water', label: 'Drink Water', completed: false },
    { id: 'sunlight', label: 'Get Sunlight', completed: false },
    { id: 'walk', label: 'Walk', completed: false },
  ];

  constructor(private showupService: Showup) {}

  ngOnInit() {
    this.selectedDate = new Date();

    this.completedDates = this.showupService.loadCompletedDates();

    queueMicrotask(() => {
      const streak = this.currentStreak;
      this.showupService.setStreak(streak);
    });

    this.resetIfNewDay();
    this.loadHabits();
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
  }

  get isCompletedSelectedDate(): boolean {
    const iso = this.toISO(this.selectedDate);
    return this.completedDates.includes(iso);
  }

  onMarkDone() {
    const today = new Date();
    const todayIso = this.toISO(today);
    // console.log('🧪 completedDates BEFORE click:', this.completedDates);
    // console.log('🧪 todayIso:', todayIso);

    if (this.isFutureDate(this.selectedDate)) {
      // console.log('cannot mark future dates');
      return;
    }

    if (this.completedDates.includes(todayIso)) {
      // console.log('ℹ️ Today already marked as done');
      return;
    }

    this.completedDates = [...this.completedDates, todayIso];
    this.showupService.saveCompletedDates(this.completedDates);
    // console.log('✅ Marked today as done:', todayIso);

    this.selectedDate = today;

    const streak = this.currentStreak;
    // console.log('📈 Dashboard calculated streak:', streak);

    this.showupService.setStreak(streak);
  }

  get currentStreak(): number {
    let streak = 0;
    let cursor = new Date();

    while (true) {
      const iso = this.toISO(cursor);

      if (this.completedDates.includes(iso)) {
        streak++;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  private isFutureDate(date: Date): boolean {
    const today = new Date();
    return this.toISO(date) > this.toISO(today);
  }

  get isFutureSelectedDate(): boolean {
    return this.isFutureDate(this.selectedDate);
  }

  onDailybasicToggle(id: string){
    // console.log('inside basic toggle...')
    this.dailyBasics = this.dailyBasics.map(habit => 
      habit.id == id 
      ? { ...habit, completed: !habit.completed }
      : habit
    );

    this.persistHabits();
  }

  loadHabits() {
    // console.log('inside load habits')
    const raw = localStorage.getItem('daily_habits_persistent');
    const saved = raw ? JSON.parse(raw) : {};

    this.dailyBasics = this.dailyBasics.map(habit => ({
      ...habit,
      completed: saved[habit.id] ?? habit.completed,
    }));
  }


  persistHabits(){
    // console.log('inside basic persist habit...')
    const record = this.dailyBasics.reduce((acc, habit) => {
      acc[habit.id] = habit.completed;
      return acc;
    }, {} as Record<string, boolean>)

    localStorage.setItem('daily_habits_persistent', JSON.stringify(record));
  }

  private getTodayKey(): string {
    return this.toISO(new Date());
  }
  resetIfNewDay() {
    const today = this.getTodayKey();
    const lastOpen = localStorage.getItem(this.LAST_OPEN_DATE_KEY);

    if (lastOpen && lastOpen !== today) {
      // New day → reset habits
      this.dailyBasics = this.dailyBasics.map(habit => ({
        ...habit,
        completed: false,
      }));

      // Persist the reset state
      this.persistHabits();
    }

    // Update last open date
    localStorage.setItem(this.LAST_OPEN_DATE_KEY, today);
  }

  //======================= Utils ===========================================
  private toISO(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}
