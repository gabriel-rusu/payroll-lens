import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WorkdayCounterService } from '../../service/workday.service';
import { differenceInCalendarDays, format, isAfter, isWeekend, nextMonday, parse } from 'date-fns';
import { DatePipe } from '@angular/common';
import { Compensation } from '../../model/compensation';
import { Calendar } from '../../component/calendar/calendar';
import { FloatingDaysInsight } from '../../component/floating-days-insight/floating-days-insight';

@Component({
  selector: 'app-vacation-planner',
  imports: [DatePipe, Calendar, FloatingDaysInsight],
  templateUrl: './vacation-planner.html',
  styleUrl: './vacation-planner.css',
  standalone: true,
})
export class VacationPlanner implements OnInit {
  private _year = signal(new Date().getFullYear());
  private workdayService = inject(WorkdayCounterService);

  protected selectedRegion = signal('RO');
  protected compensatedHolidays = signal(Array<Compensation>());

  protected holidays = computed(() => {
    let daysOff = this.holidayMap();
    let numberOfDays = 0;
    Object.keys(daysOff).forEach((key) => {
      if (daysOff[key].type === 'regional') {
        numberOfDays += 1;
      }
    });
    return numberOfDays;
  });
  protected floatingDays = computed(() => {
    let daysOff = this.holidayMap();
    let numberOfDays = 0;
    Object.keys(daysOff).forEach((day) => {
      const dateObj = parse(day, 'yyyy-MM-dd', new Date());
      const dow = dateObj.getDay();
      const isWeekend = dow === 0 || dow === 6;
      if (daysOff[day].type === 'regional' && isWeekend) {
        numberOfDays += 1;
      }
    });
    return numberOfDays - 2; // subtract the Easter and the other holiday that always will be in a weekend
  });

  currentYear = computed(() => this._year());

  nextLeave = computed(() => {
    const holidays: { date: Date; name: string; type: 'regional' | 'float' }[] = [];
    Object.keys(this.holidayMap()).forEach((date) => {
      holidays.push({
        date: parse(date, 'yyyy-MM-dd', new Date()),
        name: this.holidayMap()[date].name,
        type: this.holidayMap()[date].type,
      });
    });
    holidays.sort((a, b) => a.date.getTime() - b.date.getTime());
    let nextHolidays = holidays.filter(
      (holiday) =>
        holiday.date.getTime() > new Date().getTime() &&
        holiday.date.getDay() != 0 &&
        holiday.date.getDay() != 6,
    );
    return nextHolidays[0];
  });
  deltaTillNextLeave = computed(() => differenceInCalendarDays(this.nextLeave().date, new Date()));
  protected holidayMap: WritableSignal<
    Record<string, { name: string; type: 'regional' | 'float' }>
  > = signal({});
  compensatedFloatingDays = signal<Compensation[]>([]);

  ngOnInit() {
    this.loadDaysOff(this._year());
  }

  protected loadDaysOff(year: number) {
    this.workdayService.legalDaysOff(year, this.selectedRegion()).subscribe((legalDaysOff) => {
      let currentHolidays: Record<string, { name: string; type: 'regional' | 'float' }> = {};
      legalDaysOff.forEach((dayOff) => {
        currentHolidays[dayOff.date] = { name: dayOff.name, type: 'regional' };
      });
      this.holidayMap.set(currentHolidays);
    });
  }

  remainingDays = computed(() => {
    return Object.keys(this.holidayMap()).filter((date) =>
      isAfter(parse(date, 'yyyy-MM-dd', new Date()), new Date()),
    ).length;
  });

  protected daysOff = computed(() => {
    let days: Record<string, { name: string; type: 'regional' | 'float' }> = {};
    for (let date in this.holidayMap()) {
      days[date] = this.holidayMap()[date];
    }
    for (let floatDay of this.compensatedFloatingDays()) {
      let dateString = format(floatDay.compensatoryDate, 'yyyy-MM-dd');
      let holidayDateString = format(floatDay.holidayDate, 'yyyy-MM-dd');
      days[dateString] = {
        name: 'Comp: ' + this.holidayMap()[holidayDateString]?.name,
        type: 'float',
      };
    }

    return days;
  });
}
