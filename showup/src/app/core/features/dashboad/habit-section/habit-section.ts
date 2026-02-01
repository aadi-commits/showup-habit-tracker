import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-habit-section',
  imports: [],
  templateUrl: './habit-section.html',
  styleUrl: './habit-section.css',
})
export class HabitSection {

  @Input() title!: string;
  @Input() habits: { id: string; label: string; completed: boolean }[] = [];

  @Output() toggleHabit = new EventEmitter<string>();

  isExpanded = false;

  toggleSection(){
    this.isExpanded = !this.isExpanded;
  }

  onHabitToggle(id: string){
    this.toggleHabit.emit(id);
  }
}
