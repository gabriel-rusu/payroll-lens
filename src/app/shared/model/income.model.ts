export class Income {

  constructor(public type: string, public currency: string, public value: number, public frequency: string,
              public daysPerWeek?: number, public hoursPerWeek?: number, public holidays?: number, public vacationDays?: number) {

  }
}
