export class Income {

  constructor(public type: string, public currency: string, public value: number, public frequency: string,
              public daysPerWeek?: number, public hoursPerWeek?: number, public holidays?: number, public vacationDays?: number) {

  }

  static clone(income: Income) {
    return new Income(income.type, income.currency, income.value, income.frequency, income.daysPerWeek,
      income.hoursPerWeek, income.holidays, income.vacationDays);
  }
}
