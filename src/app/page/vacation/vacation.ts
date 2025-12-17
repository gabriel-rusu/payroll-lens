import {Component, OnInit} from '@angular/core';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {WorkdayCounterService} from '../../shared/service/workday-counter.service';
import {LocalizationService} from '../../shared/service/localization.service';
import {FormsModule} from '@angular/forms';
import {Currency, PaydayFrequency} from '../../shared/constants';
import {enumerate} from '../../shared/util.functions';

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
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    }
  };
  protected legalHolidays: any[] = [];

  constructor(private workdayCounter: WorkdayCounterService, private localizationService: LocalizationService) {
  }

  ngOnInit() {
    this.workdayCounter.legalDaysOff(new Date().getFullYear(), this.localizationService.getCountryCode()).subscribe(
      data => {
        this.legalHolidays.push(...data.map(entry => { entry.title = entry.name;
        return entry;}));
        this.legalHolidays = [...this.legalHolidays];
        console.log(this.legalHolidays);
      })

    this.workdayCounter.legalDaysOff(new Date().getFullYear()+1, this.localizationService.getCountryCode()).subscribe(
      data => {
        this.legalHolidays.push(...data.map(entry => { entry.title = entry.name; return entry;}));
        this.legalHolidays = [...this.legalHolidays];
        console.log(this.legalHolidays);
      })
  }

  protected readonly PaydayFrequency = PaydayFrequency;
  protected readonly Currency = Currency;
  protected readonly enumerate = enumerate;
}
