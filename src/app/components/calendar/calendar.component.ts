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
  
  daysInMonth(month : number, year : number): number{
        return new Date(year, month, 0).getDate();
  }

  DaysArray: number[] = new Array(this.daysInMonth(this.today.getMonth(), this.today.getFullYear()));

  GetDisplayMonth(): number[]{
    
    let returnArray = [];
    let firstOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    let lastOfMonth = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0);
    for ( let i = firstOfMonth.getDay(); i > 0; i--){
      returnArray.push(firstOfMonth.getDate()-i);
    }



    returnArray = returnArray.concat(this.DaysArray);

    let offset = 1;
    for ( let i = returnArray.length; i < 42; i++){
      returnArray.push(lastOfMonth.getDate()+offset);
      offset++;

    }


    // console.log(returnArray);

    return returnArray;
  }

  
}
