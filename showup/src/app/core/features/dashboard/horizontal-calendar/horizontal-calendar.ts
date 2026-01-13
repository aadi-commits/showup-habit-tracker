import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
],
  templateUrl: './horizontal-calendar.html',
  styleUrl: './horizontal-calendar.css',
})
export class HorizontalCalendar implements OnInit {

  @Input() completedDates: string[] = [];
  @Output() dateSelected = new EventEmitter<Date>();

  days: CalendarDay[] = [];
  selectedDate!: Date;

  ngOnInit(): void {
    this.buildMonth();
  }

  private buildMonth(){
    this.days = [];

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for(let day = 1; day <= totalDays; day++){
      const date = new Date(year, month, day);
      const iso = date.toISOString().split('T')[0];

      this.days.push({
        date,
        day,
        isToday: this.sameDate(date, today),
        isCompleted: this.completedDates.includes(iso)
      });

      if(this.sameDate(date, today)){
        this.selectedDate = date;
      }
    }

    this.dateSelected.emit(this.selectedDate);
  }

  select(day: CalendarDay) {
    console.log(day.date)
    this.selectedDate = day.date;
    this.dateSelected.emit(day.date);
  }

  private sameDate(a: Date, b: Date): boolean{
    return a.toDateString() === b.toDateString();
  }
}
