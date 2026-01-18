import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-checkin',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './daily-checkin.html',
  styleUrl: './daily-checkin.css',
})
export class DailyCheckin {
  @Input() isCompleted = false;
  @Input() disabled = false;
  @Output() markDone = new EventEmitter<void>();

  onClick() {
    console.log('✅ DailyCheckin: button clicked');

    if (this.disabled) return;
    this.markDone.emit();
  }
}
