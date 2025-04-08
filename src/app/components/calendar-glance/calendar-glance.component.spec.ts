import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarGlanceComponent } from './calendar-glance.component';

describe('CalendarGlanceComponent', () => {
  let component: CalendarGlanceComponent;
  let fixture: ComponentFixture<CalendarGlanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarGlanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarGlanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
