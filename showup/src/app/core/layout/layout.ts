import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopToolbar } from './top-toolbar/top-toolbar';
import { Showup } from '../services/showup';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, TopToolbar, AsyncPipe],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit {
  // Global data (for now hardcoded, later from service)
  currentStreak = 0;
  today = new Date();
  streak$!: Observable<number>;

  constructor(private showupService: Showup) {
    this.streak$ = showupService.streak$;
  }

  ngOnInit(): void {
    this.showupService.streak$.subscribe((streak) => {
      this.streak$ = this.showupService.streak$;
      console.log('toolbar streak updated:', streak);
    });
  }

  openSettings() {
    console.log('Settings clicked from layout');
  }

  updateStreak(streak: number) {
    this.currentStreak = streak;
  }
}
