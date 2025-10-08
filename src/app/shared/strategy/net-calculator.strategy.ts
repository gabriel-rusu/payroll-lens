import {BaseCalculatorStrategy} from './base-calculator.strategy';
import {Income} from '../model/income.model';
import {Tax} from '../model/tax.model';
import {TaxOrder, TaxType} from '../constants';
import {IncomeBreakdown} from '../model/income-breakdown.model';

export class NetCalculatorStrategy extends BaseCalculatorStrategy {
  computeTaxRates(income: Income | undefined, taxes: Tax[]): IncomeBreakdown {
    let pay = this.payAmount(income);
    let taxRates: Tax[] = this.processTaxes(taxes)
    for (let tax of taxRates) {
      if (tax.order == TaxOrder.GROSS) {
        tax.computeValue(pay.gross);
        if (tax.type == TaxType.EMPLOYEE) {
          pay.remaining -= tax.value;
        }
      } else if (tax.order == TaxOrder.REMAINING) {
        tax.computeValue(pay.remaining);
        if (tax.type == TaxType.EMPLOYEE) {
          pay.remaining -= tax.value;
        }
      }
    }
    return new IncomeBreakdown(pay.remaining, pay.gross, pay.remaining / pay.gross, taxRates);
  }


}
