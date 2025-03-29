import { Component, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import e from 'express';


@Component({
  selector: 'app-day',
  imports: [],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})

export class DayComponent {

  constructor( private route: ActivatedRoute){

  }


  
  dayParam:number = 0;
  monthParam:number = 0;
  yearParam:number = 0;
  weekShort: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  monthShort: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  fromLink: string = '';

  ngOnInit(){
    this.route.params.subscribe( params => {
      let todayBackup = new Date();

      // Get the Day parameter
      if (params['day'] != undefined) {
        this.dayParam = params['day'];
      } else {
        this.dayParam = todayBackup.getDate();
      }
      // Get the Month parameter
      if (params['month'] != undefined){
        this.monthParam = params['month'];
      } else {
        this.monthParam = todayBackup.getMonth();
      }
      // Get the Day parameter
      if (params['year'] != undefined ){
        this.yearParam = params['year'];
      } else {
        this.yearParam = todayBackup.getFullYear();
      }

      
    })
  }

  GetMonthEnder(day:number): string{
    if (day == 1 || day == 11){
      return 'st';
    } else if (day == 2 || day == 12 ){
      return 'nd';
    } else{
      return 'th';
    }
    
  }



}
