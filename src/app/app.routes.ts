import { Routes } from '@angular/router';
import { CalendarGlanceComponent } from './components/calendar-glance/calendar-glance.component';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HomeComponent } from './components/home/home.component';
import { DayComponent } from './components/day/day.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'glance',
        component: CalendarGlanceComponent,
    },
    {
        path: 'calendar',
        component: CalendarComponent,
    },
    { path: 'day/:year/:month/:day', component: DayComponent, },
    { path: 'day/:month/:day', component: DayComponent, },
    { path: 'day/:day', component: DayComponent, },
    

];
