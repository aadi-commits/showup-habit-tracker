import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Showup {
  private streakSubject = new BehaviorSubject<number>(0);

  private readonly STORAGE_KEY = 'showup_completed_dates';

  streak$ = this.streakSubject.asObservable();

  setStreak(streak: number) {
    this.streakSubject.next(streak);
  }

  saveCompletedDates(dates: string[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dates));
  }

  loadCompletedDates(): string[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
}
