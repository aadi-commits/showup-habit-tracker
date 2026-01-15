import { Component, OnInit } from '@angular/core';
import { HorizontalCalendar } from './horizontal-calendar/horizontal-calendar';
import { TodayStatus } from './today-status/today-status';
import { DailyCheckin } from './daily-checkin/daily-checkin';
import { Showup } from '../../services/showup';

@Component({
  selector: 'app-dashboard',
  imports: [HorizontalCalendar, TodayStatus, DailyCheckin],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  selectedDate!: Date;
  completedDates: string[] = [
    // example
    // '2026-01-14',
  ];

  constructor(private showupService: Showup) {}

  ngOnInit() {
    this.selectedDate = new Date();

    this.completedDates = this.showupService.loadCompletedDates();

    const streak = this.currentStreak;
    this.showupService.setStreak(streak);
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
    console.log('🧪 completedDates BEFORE click:', this.completedDates);
    console.log('🧪 todayIso:', todayIso);

    if (this.completedDates.includes(todayIso)) {
      console.log('ℹ️ Today already marked as done');
      return;
    }

    this.completedDates = [...this.completedDates, todayIso];
    this.showupService.saveCompletedDates(this.completedDates);
    console.log('✅ Marked today as done:', todayIso);

    this.selectedDate = today;

    const streak = this.currentStreak;
    console.log('📈 Dashboard calculated streak:', streak);

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

  //======================= Utils ===========================================
  private toISO(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}
