import { NgFor, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-goals',
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent {



  goals: { title: string; tasks: { name: string; completed: boolean }[] }[] = [];

  addGoal(title: string) {
    this.goals.push({ title, tasks: [] });
  }

  addTask(goalIndex: number, taskName: string) {
    this.goals[goalIndex].tasks.push({ name: taskName, completed: false });
  }

  toggleTaskCompletion(goalIndex: number, taskIndex: number) {
    const task = this.goals[goalIndex].tasks[taskIndex];
    task.completed = !task.completed;
  }

  removeGoal(goalIndex: number) {
    this.goals.splice(goalIndex, 1);
  }

  removeTask(goalIndex: number, taskIndex: number) {
    this.goals[goalIndex].tasks.splice(taskIndex, 1);
  }



}
