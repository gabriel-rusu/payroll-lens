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
import {Dropdown} from '../../component/dropdown/dropdown';
import {DictionaryValue} from '../../shared/model/dictionary.value';

@Component({
  selector: 'app-vacation',
  imports: [
    FullCalendarModule,
    FormsModule,
    Dropdown
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
          this.floatingDays = !this.floatingDays;
          // Toggle active class
          if (this.floatingDays) {
            element.classList.add('fc-button-active');
            this.resetVacationSuggestions();
            this.suggestVacations();
          } else {
            element.classList.remove('fc-button-active');
          }

          console.log('Toggle state:', this.floatingDays);
        }
      }
    },
    firstDay: 1,
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    height: '60vh',
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
  protected floatingDays: boolean = false;
  protected workWeekDays: DictionaryValue[] = [
    new DictionaryValue(1, 'Monday'),
    new DictionaryValue(2, 'Tuesday'),
    new DictionaryValue(3, 'Wednesday'),
    new DictionaryValue(4, 'Thursday'),
    new DictionaryValue(5, 'Friday'),
  ];

  constructor(private workdayCounter: WorkdayCounterService, private localizationService: LocalizationService) {
  }

  ngOnInit() {
    this.workdayCounter.legalDaysOff(new Date().getFullYear(), this.localizationService.getCountryCode()).pipe(
      zipWith(this.workdayCounter.legalDaysOff(new Date().getFullYear() + 1, this.localizationService.getCountryCode()))
    ).subscribe(
      data => {
        console.log(data);
        let [currentYearHolidays, nextYearHolidays] = data;
        this.legalHolidays.push(...currentYearHolidays.map(entry => {
          entry.title = entry.localName;
          entry.color = 'green';
          return entry;
        }));
        this.legalHolidays.push(...nextYearHolidays.map(entry => {
          entry.title = entry.localName;
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
        if (!isWeekend(currentDay) && !this.floatingDays &&
          this.holidayDates.some(date => isSameDay(date, currentDay))) {
          holidayCount++;
        } else if(this.floatingDays && this.holidayDates.some(date => isSameDay(date, currentDay))) {
          console.log('Holiday date is: ', currentDay);
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

  private resetVacationSuggestions() {
    this.legalHolidays = this.legalHolidays.filter(entry => entry.title != 'Suggestion');
  }

  protected compensationDay(event: Event) {
    console.log(event);
  }
}
