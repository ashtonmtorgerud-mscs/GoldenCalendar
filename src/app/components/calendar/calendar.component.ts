import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-calendar',
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})


export class CalendarComponent {

  today: Date = new Date();
  monthLength: number = this.today.getMonth();
  numberOfDivs: number = 5;
  
  weekShort: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
  monthShort: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]

  firstOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  lastOfMonth = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0);
  firstOfNextMonth = new Date(this.today.getFullYear(), this.today.getMonth()+1, 1);
  lastOfLastMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 0);


  GetLastMonthDays(): number[] {
    let lastMonth: number[] = [];
    
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
    let index: number = this.lastOfMonth.getDate();
    for (let i = this.lastOfMonth.getDate(); i <= 35; i++){
      nextMonth.push(i-this.lastOfMonth.getDate()+1);
    }

    return nextMonth;
    // return this.GetLastMonthDays().concat(this.GetThisMonthDays()) 
  };

  
}
