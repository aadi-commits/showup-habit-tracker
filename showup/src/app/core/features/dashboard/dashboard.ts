import { Component } from '@angular/core';
import { HorizontalCalendar } from './horizontal-calendar/horizontal-calendar';
import { TodayStatus } from './today-status/today-status';
import { DailyCheckin } from './daily-checkin/daily-checkin';

@Component({
  selector: 'app-dashboard',
  imports: [HorizontalCalendar, TodayStatus, DailyCheckin],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  selectedDate!: Date;
  completedDates: string[] = [
    // example
    // '2026-01-14'
  ];

  onDateSelected(date: Date) {
    this.selectedDate = date;
  }

  get isCompletedSelectedDate(): boolean {
    if (!this.selectedDate) return false;

    const iso = this.toISO(this.selectedDate);
    return this.completedDates.includes(iso);
  }

  onMarkDone() {
    console.log('🎯 Dashboard: markDone event received');

    const iso = this.toISO(this.selectedDate);
    console.log('🎯 Dashboard: markDone event received');

    if (!this.completedDates.includes(iso)) {
      this.completedDates = [...this.completedDates, iso];
      console.log('✅ completedDates updated:', this.completedDates);
    } else {
      console.log('ℹ️ Date already marked as done');
    }
  }

  //======================= Utils ===========================================
  private toISO(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
