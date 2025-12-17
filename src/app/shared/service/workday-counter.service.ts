import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {eachDayOfInterval, endOfMonth, format, getDay, parse, startOfMonth} from "date-fns";
import {map} from 'rxjs';
import {LegalDayOff} from '../model/legal-day-off.model';
import {LocalizationService} from './localization.service';

@Injectable({
  providedIn: 'root'
})
export class WorkdayCounterService {
  constructor(private httpClient: HttpClient, private localizationService: LocalizationService) {
  }

  getWorkingDaysInMonth(year: number, month: number): Date[] {
    // month is 0-based: 0 = January, 11 = December
    const start = startOfMonth(new Date(year, month));
    const end = endOfMonth(start);

    // Get all days in the month
    const allDays = eachDayOfInterval({start, end});

    // Filter weekdays (1=Mon, 5=Fri)
    return allDays.filter(day => {
      const dayOfWeek = getDay(day); // 0 = Sunday, 6 = Saturday
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    });
  }

  getNumberOfWorkingDays() {
    return this.daysOff(new Date().getFullYear(), this.localizationService.getCountryCode())
      .pipe(map(daysOff => {
        let workingDays = this.getWorkingDaysInMonth(
          new Date().getFullYear(),
          new Date().getMonth()
        );
        workingDays = workingDays.filter(workingDay =>
          !daysOff.some(dayOff =>
            format(dayOff, 'yyyy-MM-dd') == format(workingDay, 'yyyy-MM-dd')))
        return workingDays.length;
      }));
  }


  daysOff(year: number, country: string) {
    return this.httpClient.get<LegalDayOff[]>(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`)
      .pipe(map(legalDays => legalDays.map(legalDay => parse(legalDay.date, 'yyyy-MM-dd', new Date()))));
  }

  legalDaysOff(year: number, country: string) {
    return this.httpClient.get<LegalDayOff[]>(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`);
  }
}
