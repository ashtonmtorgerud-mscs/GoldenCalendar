import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CalendarGlanceComponent } from './app/components/calendar-glance/calendar-glance.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
