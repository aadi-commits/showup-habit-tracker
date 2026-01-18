import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-top-toolbar',
  imports: [
    MatToolbarModule, 
    MatIconModule,
    MatButtonModule,
    DatePipe],
  templateUrl: './top-toolbar.html',
  styleUrl: './top-toolbar.css',
})
export class TopToolbar {

  @Input() currentStreak: number = 0;
  @Input() today: Date = new Date();
  
  @Output() settingsClick = new EventEmitter<void>();

}
