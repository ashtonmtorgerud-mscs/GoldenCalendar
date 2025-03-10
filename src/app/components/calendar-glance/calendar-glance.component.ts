import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-calendar-glance',
  imports: [RouterLink],
  templateUrl: './calendar-glance.component.html',
  styleUrl: './calendar-glance.component.css'
})



export class CalendarGlanceComponent {
  today: Date = new Date();
  week: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
  dayOfTheWeek: number = this.today.getDay();
  dayOfTheMonth: number = this.today.getDate();

  getDayOfWeek(input: number): string {
    if (input < 0){
      input = 6;
    }
    return this.week[input];
  }

}
