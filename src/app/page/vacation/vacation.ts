import {Component, OnInit} from '@angular/core';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {WorkdayCounterService} from '../../shared/service/workday-counter.service';
import {LocalizationService} from '../../shared/service/localization.service';
import {FormsModule} from '@angular/forms';
import {zipWith} from 'rxjs';
import {addDays, addYears, eachWeekOfInterval, format, isSameDay, isSunday, isWeekend, parse} from 'date-fns';

@Component({
  selector: 'app-vacation',
  imports: [
    FullCalendarModule,
    FormsModule
  ],
  templateUrl: './vacation.html',
  styleUrl: './vacation.css'
})
export class Vacation implements OnInit {
  private isMobile = window.innerWidth < 576;
  calendarOptions: CalendarOptions = {
    customButtons: {
      floatingDays: {
        text: 'Floating Days',
        click: (ev: MouseEvent, element: HTMLElement) => {
          this.isActive = !this.isActive;
          // Toggle active class
          if (this.isActive) {
            element.classList.add('fc-button-active');
          } else {
            element.classList.remove('fc-button-active');
          }

          console.log('Toggle state:', this.isActive);
        }
      }
    },
    firstDay: 1,
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    height: '65vh',
    dayHeaderFormat: { weekday: 'narrow' }, // M T W T F S S
    expandRows: true,
    headerToolbar: this.isMobile ? {
      left: '',
      center: 'title',
      right: ''
    } : {
      left: 'floatingDays',
      center: 'title',
      right: 'prev,today,next'
    },
    footerToolbar: this.isMobile ? {
      left: 'floatingDays',
      center: '',
      right: 'prev,today,next'
    } : false
  };
  protected legalHolidays: any[] = [];
  private holidayDates: Date[] = [];
  private isActive: boolean = false;

  constructor(private workdayCounter: WorkdayCounterService, private localizationService: LocalizationService) {
  }

  ngOnInit() {
    this.workdayCounter.legalDaysOff(new Date().getFullYear(), this.localizationService.getCountryCode()).pipe(
      zipWith(this.workdayCounter.legalDaysOff(new Date().getFullYear() + 1, this.localizationService.getCountryCode()))
    ).subscribe(
      data => {
        let [currentYearHolidays, nextYearHolidays] = data;
        this.legalHolidays.push(...currentYearHolidays.map(entry => {
          entry.title = entry.name;
          entry.color = 'green';
          return entry;
        }));
        this.legalHolidays.push(...nextYearHolidays.map(entry => {
          entry.title = entry.name;
          entry.color = 'green';
          return entry;
        }));
        this.legalHolidays = [...this.legalHolidays];
        this.holidayDates = this.legalHolidays.map(holiday => parse(holiday.date, 'yyyy-MM-dd', new Date()));

        this.suggestVacations();
      });
  }

  private suggestVacations() {
    let startingWeekDays = eachWeekOfInterval({
      start: new Date(),
      end: addYears(new Date(), 1)
    });

    let holidaysInWeek = new Map<Date, number>();
    for (let startingDay of startingWeekDays) {
      holidaysInWeek.set(startingDay, 0);
      let holidayCount = 0;
      let currentDay = addDays(startingDay, 1);
      while (!isSunday(currentDay)) {
        if (!isWeekend(currentDay) && this.holidayDates.some(date => isSameDay(date, currentDay))) {
          holidayCount++;
        }
        holidaysInWeek.set(startingDay, holidayCount);
        currentDay = addDays(currentDay, 1);
      }
    }

    for (const key of holidaysInWeek.keys()) {
      // @ts-ignore
      if (holidaysInWeek?.has(key) && holidaysInWeek.get(key) >= 1) {
        let currentDay = addDays(key, 1);
        while (!isSunday(currentDay)) {
          if (!this.holidayDates.some(date => isSameDay(date, currentDay)) && !isWeekend(currentDay)) {
            // @ts-ignore
            this.legalHolidays.push({date: format(currentDay, 'yyyy-MM-dd'), color: 'purple', title: 'Suggestion'});
          }
          currentDay = addDays(currentDay, 1);
        }
      }
    }
    this.legalHolidays = [...this.legalHolidays];
    console.log(holidaysInWeek);
    console.log(this.legalHolidays);
  }
}
