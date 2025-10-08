import {Tax} from './tax.model';

export class IncomeBreakdown {

  constructor(public netIncome: number, public grossIncome: number, public netToGrossRation: number,
              public taxRates: Tax[]) {
  }
}
