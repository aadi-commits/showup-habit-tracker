import { Component } from '@angular/core';
import { HorizontalCalendar } from "./horizontal-calendar/horizontal-calendar";

@Component({
  selector: 'app-dashboard',
  imports: [HorizontalCalendar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
