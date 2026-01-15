import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopToolbar } from './top-toolbar/top-toolbar';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, TopToolbar],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  // Global data (for now hardcoded, later from service)
  currentStreak = 0;
  today = new Date();

  openSettings() {
    console.log('Settings clicked from layout');
  }

  updateStreak(streak: number) {
    this.currentStreak = streak;
  }
}
