import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

export interface CalendarDay {
  date: Date;
  day: number;
  isToday: boolean;
  isCompleted: boolean;
}

@Component({
  selector: 'app-horizontal-calendar',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './horizontal-calendar.html',
  styleUrl: './horizontal-calendar.css',
})
export class HorizontalCalendar implements OnInit, AfterViewInit {
  @ViewChildren('dayEl', { read: ElementRef })
  dayElements!: QueryList<ElementRef<HTMLButtonElement>>;

  @Input() completedDates: string[] = [];
  @Output() dateSelected = new EventEmitter<Date>();

  days: CalendarDay[] = [];
  selectedDate!: Date;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToToday();
    });
  }

  ngOnInit(): void {
    this.buildMonth();
  }

  private buildMonth() {
    this.days = [];

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const iso = this.toISO(date);

      this.days.push({
        date,
        day,
        isToday: this.sameDate(date, today),
        isCompleted: this.completedDates.includes(iso),
      });

      if (this.sameDate(date, today)) {
        this.selectedDate = date;
      }
    }

    this.dateSelected.emit(this.selectedDate);
  }

  select(day: CalendarDay) {
    // console.log(day.date);
    this.selectedDate = day.date;
    this.dateSelected.emit(day.date);
  }

  private sameDate(a: Date, b: Date): boolean {
    return a.toDateString() === b.toDateString();
  }

  private scrollToToday() {
    const todayIndex = this.days.findIndex((d) => d.isToday);
    // console.log('today:', todayIndex);
    if (todayIndex === -1) return;

    const el = this.dayElements.get(todayIndex)?.nativeElement;
    // console.log('el:', el);
    if (!el) return;

    el.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }

  private toISO(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}
