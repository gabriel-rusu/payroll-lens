import { BaseCalculatorStrategy } from './base-calculator.strategy';
import { Tax } from '../model/tax';
import { TaxOrder, TaxType } from '../util/constants';
import { NetCalculatorStrategy } from './net-calculator.strategy';
import { IncomeBreakdown } from '../model/income-breakdown';
import { Income } from '../model/income';

export class GrossCalculatorStrategy extends BaseCalculatorStrategy {
  constructor() {
    super();
  }

  computeTaxRates(income: Income | undefined, taxes: Tax[]): IncomeBreakdown {
    let pay = this.payAmount(income);
    let grossPercent = 100;
    let taxRates = this.processTaxes(taxes);
    for (let tax of taxRates) {
      if (tax.order == TaxOrder.GROSS && tax.type == TaxType.EMPLOYEE) {
        grossPercent -= Number(tax.quota);
      } else if (tax.type == TaxType.EMPLOYEE) {
        grossPercent -= (Number(tax.quota) / 100) * grossPercent;
      }
    }
    pay.gross = (pay.remaining * 100) / grossPercent;
    income = Income.clone(income as Income);
    income.value = pay.gross;
    return new NetCalculatorStrategy().computeTaxRates(income, taxes);
  }
}
