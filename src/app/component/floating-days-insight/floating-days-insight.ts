import { Component, computed, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Compensation } from '../../model/compensation';
import { format, isWeekend, nextMonday, parse, previousFriday } from 'date-fns';
import { FloatingRule } from '../../pages/vacation-planner/model/floating.rule';
import { Day } from '../../model/day.enum';
import { getDayName } from '../../util/functions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-floating-days-insight',
  imports: [DatePipe, FormsModule],
  templateUrl: './floating-days-insight.html',
  styleUrl: './floating-days-insight.css',
})
export class FloatingDaysInsight {
  protected readonly Day = Day;
  protected readonly getDayName = getDayName;
  protected floatingDaysRulesVisible = signal(false);

  holidays = input.required<Record<string, { name: string; type: 'regional' | 'float' }>>();
  floatingDays = output<Compensation[]>({});

  compensatedHolidays = computed(() => {
    let compensatoryDates: Compensation[] = [];
    for (let holiday in this.holidays()) {
      let date = parse(holiday, 'yyyy-MM-dd', new Date());
      console.log('Again?!');
      let freeDay = this.compensatoryDay(date);
      console.log('Free Day:', freeDay);
      if (
        isWeekend(date) &&
        !this.holidays()[holiday]?.name?.includes('Easter') &&
        freeDay != null &&
        !this.holidays()[format(freeDay, 'yyyy-MM-dd')]
      ) {
        console.log('How so?');
        compensatoryDates.push({ holidayDate: date, compensatoryDate: freeDay });
      }
    }
    this.floatingDays.emit(structuredClone(compensatoryDates));
    return compensatoryDates;
  });

  protected defaultCompensations = signal([
    { weekendDay: Day.Saturday, workWeekDay: Day.Monday },
    { weekendDay: Day.Sunday, workWeekDay: Day.Monday },
  ]);
  protected compensationRules = signal([...this.defaultCompensations()]);

  protected weekend: Day = Day.Sunday;
  protected workDay: Day = Day.Monday;

  protected abortChanges() {
    this.compensationRules.set([...this.defaultCompensations()]);
    this.floatingDaysRulesVisible.set(false);
  }

  protected saveNewRules() {
    this.defaultCompensations.set([...this.compensationRules()]);
    this.floatingDaysRulesVisible.set(false);
  }

  private compensatoryDay(date: Date) {
    if (!isWeekend(date)) {
      return date;
    }
    if (this.defaultCompensations().length == 0) {
      return null;
    } else {
      console.log(this.defaultCompensations());
      let compensation = this.defaultCompensations().find(
        (compensation) => compensation.weekendDay === date.getDay());
      return compensation != null ? compensation.workWeekDay == Day.Monday ? nextMonday(date) : previousFriday(date) : null;
    }
  }

  protected containsTheRule(day: number): boolean {
    return this.compensationRules().findIndex(comp => comp.weekendDay === day) != -1;
  }
}
