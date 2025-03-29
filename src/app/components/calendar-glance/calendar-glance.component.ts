import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';




@Component({
  selector: 'app-calendar-glance',
  imports: [RouterLink],
  templateUrl: './calendar-glance.component.html',
  styleUrl: './calendar-glance.component.css'
})



export class CalendarGlanceComponent {

  // weatherAPIURL = 'https://api.open-meteo.com/v1/forecast?latitude=43.6738&longitude=-92.0837&current_weather=true'
  weatherAPIURL = 'https://api.open-meteo.com/v1/forecast?latitude=43.6738&longitude=-92.0837&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=America/Chicago';
  
  
  
  weatherIcons: string[] = ['','','','','','',''];
  weatherAPIObject: object = ({});

  // constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getStuff();
  }

  

  async getStuff(){
    try {
      let response = await fetch(this.weatherAPIURL);
      let data = await response.json(); // Parse the JSON response
      console.log(data.daily.weathercode); // Now, you can log the actual data
      this.weatherAPIObject = data;

      for (let i = 0; i < this.weatherIcons.length; i++){
        try{
          switch(data.daily.weathercode[i]){

            case 0: this.weatherIcons[i] = '☀️'; break;
            case 1: this.weatherIcons[i] = '☀️'; break;
            case 2: this.weatherIcons[i] = '⛅'; break;
            case 3: this.weatherIcons[i] = '☁️'; break;
            case 51: this.weatherIcons[i] = '💧'; break;
            case 53: this.weatherIcons[i] = '💧'; break;
            case 55: this.weatherIcons[i] = '💧'; break;
            case 61: this.weatherIcons[i] = '🌧️'; break;
            case 63: this.weatherIcons[i] = '🌧️'; break;
            case 65: this.weatherIcons[i] = '🌧️'; break;
            case 71: this.weatherIcons[i] = '🌨️'; break;
            case 73: this.weatherIcons[i] = '🌨️'; break;
            case 75: this.weatherIcons[i] = '🌨️'; break;
            default: this.weatherIcons[i] = '?';
          }
        } catch(error){
  
        }

      }


    } catch (error) {
      console.error('Error fetching data:', error);
    }





  }
  

  today: Date = new Date();
  week: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
  dayOfTheWeek: number = this.today.getDay();
  dayOfTheMonth: number = this.today.getDate();

  getDayOfWeek(input: number): string {
    if (input < 0){
      input = 6;
    }
    if (input > 6){
      input -= 7;
    }
    return this.week[input];
  }

}
