import { Tax } from './tax';

export class IncomeBreakdown {
  constructor(
    public netIncome: number,
    public grossIncome: number,
    public netToGrossRation: number,
    public taxRates: Tax[],
  ) {}
}
