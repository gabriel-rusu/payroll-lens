import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { SideNavBar } from '../../component/side-nav-bar/side-nav-bar';
import { CalendarDay } from './model/calendar.day';
import { FloatingRule } from './model/floating.rule';
import { WorkdayCounterService } from '../../service/workday.service';
import { Countries } from '../../util/constants';

@Component({
  selector: 'app-vacation-planner',
  imports: [],
  templateUrl: './vacation-planner.html',
  styleUrl: './vacation-planner.css',
  standalone: true,
})
export class VacationPlanner implements OnInit {
  private _month = signal(new Date().getMonth()); // October (0-indexed)
  private _year = signal(new Date().getFullYear());
  private _showAllRules = signal(false);
  private workdayService = inject(WorkdayCounterService);

  currentMonthIndex = computed(() => this._month());
  currentMonthName = computed(() => this.months[this._month()]);
  currentYear = computed(() => this._year());
  showAllRules = computed(() => this._showAllRules());

  private holidayMap: WritableSignal<Record<string, { name: string; type: 'regional' | 'float' }>> =
    signal({
      '2024-10-12': { name: 'Columbus Day', type: 'regional' },
      '2024-10-21': { name: 'Float Comp', type: 'float' },
      '2024-11-01': { name: "All Saints' Day", type: 'regional' },
      '2024-11-11': { name: 'Veterans Day', type: 'regional' },
      '2024-12-25': { name: 'Christmas Day', type: 'regional' },
      '2024-12-26': { name: 'Boxing Day', type: 'regional' },
      '2024-12-30': { name: 'Float Comp', type: 'float' },
      '2026-04-12': { name: 'Orthodox Easter', type: 'regional' },
      '2026-05-13': { name: 'Birthday', type: 'float' },
    });
  protected dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  readonly months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  protected readonly calendarDays = computed(() => {
    const month = this._month();
    const year = this._year();
    const days: CalendarDay[] = [];

    const firstDay = new Date(year, month, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    for (let i = offset - 1; i >= 0; i--) {
      const d = daysInPrev - i;
      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ date: d, month: 'prev', isWeekend: false, fullDate });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      const dow = dateObj.getDay();
      const isWeekend = dow === 0 || dow === 6;
      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        date: d,
        month: 'current',
        isWeekend,
        holiday: this.holidayMap()[fullDate],
        fullDate,
      });
    }

    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ date: d, month: 'next', isWeekend: false, fullDate });
    }
    console.log('Calendar days: ', days);
    return days;
  });

  floatingRules = computed(() => {
    const all: FloatingRule[] = [
      {
        originalDate: 'Oct 12',
        originalDay: 'Saturday',
        compensatedDate: 'Oct 14',
        compensatedDay: 'Monday',
        active: true,
      },
      {
        originalDate: 'Dec 28',
        originalDay: 'Saturday',
        compensatedDate: 'Dec 30',
        compensatedDay: 'Monday',
        active: true,
      },
      {
        originalDate: 'Nov 11',
        originalDay: 'Saturday',
        compensatedDate: 'Nov 13',
        compensatedDay: 'Monday',
        active: false,
      },
    ];
    return this._showAllRules() ? all : all.slice(0, 2);
  });

  ngOnInit() {
    // holidayMap: Record<string, { name: string; type: 'regional' | 'float' }> = {
    //   '2024-10-12': { name: 'Columbus Day', type: 'regional' },
    //   '2024-10-21': { name: 'Float Comp', type: 'float' },
    //   '2024-11-01': { name: "All Saints' Day", type: 'regional' },
    //   '2024-11-11': { name: 'Veterans Day', type: 'regional' },
    //   '2024-12-25': { name: 'Christmas Day', type: 'regional' },
    //   '2024-12-26': { name: 'Boxing Day', type: 'regional' },
    //   '2024-12-30': { name: 'Float Comp', type: 'float' },
    //   '2026-04-12': { name: 'Orthodox Easter', type: 'regional' },
    //   '2026-05-13': { name: 'Birthday', type: 'float' },
    // };
    this.loadDaysOff(this._year());
  }

  prevMonth() {
    if (this._month() === 0) {
      this.loadDaysOff(this._year() - 1);
      this._month.set(11);
      this._year.update((y) => y - 1);
    } else this._month.update((m) => m - 1);
  }

  nextMonth() {
    if (this._month() === 11) {
      this.loadDaysOff(this._year() + 1);
      this._month.set(0);
      this._year.update((y) => y + 1);
    } else this._month.update((m) => m + 1);
  }

  private loadDaysOff(year: number) {
    this.workdayService.legalDaysOff(year, 'RO').subscribe((legalDaysOff) => {
      console.log('legalDaysOff');
      console.log(legalDaysOff);
      let currentHolidays: Record<string, { name: string; type: 'regional' | 'float' }> = {};
      legalDaysOff.forEach((dayOff) => {
        currentHolidays[dayOff.date] = { name: dayOff.name, type: 'regional' };
      });
      this.holidayMap.set(currentHolidays);
    });
  }

  goToMonth(i: number) {
    this._month.set(i);
  }

  toggleRulesView() {
    this._showAllRules.update((v) => !v);
  }

  isToday(day: CalendarDay): boolean {
    if (day.month !== 'current') return false;
    const today = new Date();
    return (
      today.getFullYear() === this._year() &&
      today.getMonth() === this._month() &&
      today.getDate() === day.date
    );
  }

  // In your component
  getCellClasses(day: CalendarDay): string {
    const base = 'aspect-square p-3 text-sm font-medium relative transition-colors';

    if (day.month === 'prev' || day.month === 'next') {
      return `${base} bg-slate-50 text-slate-300`;
    }
    if (day.isWeekend) {
      return `${base} bg-slate-50 text-on-surface-variant`;
    }
    return `${base} bg-white text-on-surface hover:bg-slate-50`;
  }
}
