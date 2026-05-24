import { Component, computed, input, output, signal } from '@angular/core';
import { CalendarDay } from '../../pages/vacation-planner/model/calendar.day';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  private _month = signal(new Date().getMonth()); // October (0-indexed)
  private _year = signal(new Date().getFullYear());

  daysOff = input.required<Record<string, { name: string; type: 'regional' | 'float' }>>();
  yearChange = output<number>();

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

  currentMonthName = computed(() => this.months[this._month()]);
  currentYear = computed(() => this._year());

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
        holiday: this.daysOff()[fullDate],
        fullDate,
      });
    }

    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ date: d, month: 'next', isWeekend: false, fullDate });
    }
    return days;
  });

  prevMonth() {
    if (this._month() === 0) {
      this.yearChange.emit(this._year() - 1);
      this._month.set(11);
      this._year.update((y) => y - 1);
    } else this._month.update((m) => m - 1);
  }

  nextMonth() {
    if (this._month() === 11) {
      this.yearChange.emit(this._year() + 1);
      this._month.set(0);
      this._year.update((y) => y + 1);
    } else this._month.update((m) => m + 1);
  }

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
