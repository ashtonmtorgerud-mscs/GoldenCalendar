import { Routes } from '@angular/router';
import { CalendarGlanceComponent } from './components/calendar-glance/calendar-glance.component';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';


export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
    },
    {
        path: 'glance',
        component: CalendarGlanceComponent,
    },
    {
        path: 'calendar',
        component: CalendarComponent,
    }

];
