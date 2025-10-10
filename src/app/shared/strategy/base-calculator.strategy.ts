import {Income} from '../model/income.model';
import {Tax} from '../model/tax.model';
import {IncomeBreakdown} from '../model/income-breakdown.model';
import {Pay} from '../model/pay.model';
import {PaydayFrequency} from '../constants';
import {WorkdayCounterService} from '../service/workday-counter.service';

export abstract class BaseCalculatorStrategy {

  constructor(protected workdayCounter: WorkdayCounterService) {}

  abstract computeTaxRates(income: Income | undefined, taxes: Tax[]): IncomeBreakdown;

  protected clone(taxes: Tax[]): Tax[] {
    return [...taxes].map(tax => Tax.clone(tax));
  }

  protected payAmount(income: Income | undefined): Pay {
    let gross: number = Number(income?.value);
    if (income?.frequency == PaydayFrequency.DAY) {
      gross *= this.workdayCounter.getWorkingDaysInMonth(new Date().getFullYear(), new Date().getMonth())?.length;
    }
    return new Pay(gross, gross);
  }

  protected processTaxes(taxes: Tax[]) {
    return this.clone(taxes).sort((a, b) => a.order - b.order);
  }
}
