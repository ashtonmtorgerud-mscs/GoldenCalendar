import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { Task, TaskService } from '../task.service';


@Component({
  selector: 'app-calendar',
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})


export class CalendarComponent {

  constructor(private taskService: TaskService) { }

  today: Date = new Date();
  monthLength: number = this.today.getMonth();
  numberOfDivs: number = 5;
  
  weekShort: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
  monthShort: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  monthLong: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  firstOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  lastOfMonth = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0);
  firstOfNextMonth = new Date(this.today.getFullYear(), this.today.getMonth()+1, 1);
  lastOfLastMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 0);
  todayHighlighter = "bg-white";
  private daysCount = 35;

  GoToLastMonth(): void {
    this.today = new Date (this.today.getFullYear(), this.today.getMonth()-1, this.today.getDate());
    this.updateDayOutline();
  }

  GoToNextMonth(): void {
    this.today = new Date (this.today.getFullYear(), this.today.getMonth()+1, this.today.getDate());
    this.updateDayOutline();
  }


  GetLastMonthDays(): number[] {
    let lastMonth: number[] = [];

    this.firstOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.lastOfMonth = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0);
    
    for ( let i = 0; i < this.firstOfMonth.getDay(); i++){
      lastMonth.push(this.lastOfLastMonth.getDate()-i);
      
    }
    lastMonth.reverse();
    return lastMonth;
  }

  GetThisMonthDays(): number[] {
    let thisMonth: number[] = [];
    
    for ( let i = 0; i < new Date(this.today.getFullYear(), this.today.getMonth()+1, 0).getDate(); i++){
      thisMonth.push(1+i);
    }

    return thisMonth;
  }


  GetNextMonthDays(): number[] {
    
    let nextMonth: number[] = [];
    let index: number = this.lastOfMonth.getDate() + this.GetLastMonthDays().length;
    if (this.GetLastMonthDays().length + this.GetThisMonthDays().length > 35) { this.daysCount = 42; } else { this.daysCount = 35; }
    for (let i = index; i < this.daysCount; i++){
      nextMonth.push(i-index+1);
    }

    return nextMonth;
  };

  GetDayEvents(iDay:number): string[]{
    
    let checkDate = new Date (this.today.getFullYear(), this.today.getMonth(), iDay);
    let todaysEvents: string[] = [];

    this.taskService.getTasksOfDate(checkDate).forEach(task => {
      todaysEvents.push(task.title);
    });

    return todaysEvents;
  }


  updateDayOutline(): void {
    let currentDay = new Date();
    if (currentDay.getFullYear() == this.today.getFullYear() && currentDay.getMonth() == this.today.getMonth() && currentDay.getDate() == this.today.getDate()){
      this.todayHighlighter = "bg-red-100";
    } else {
      this.todayHighlighter = "bg-white";
    }
  }

  
}
