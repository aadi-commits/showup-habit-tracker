import { Component, Input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-today-status',
  imports: [MatCard, MatIconModule],
  templateUrl: './today-status.html',
  styleUrl: './today-status.css',
})
export class TodayStatus {
  @Input() isCompletedToday!: boolean;
}
