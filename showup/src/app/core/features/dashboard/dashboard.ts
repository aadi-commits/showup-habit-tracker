import { Component } from '@angular/core';
import { HorizontalCalendar } from './horizontal-calendar/horizontal-calendar';
import { TodayStatus } from './today-status/today-status';

@Component({
  selector: 'app-dashboard',
  imports: [HorizontalCalendar, TodayStatus],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  isCompletedSelectedDate: boolean = true;
}
