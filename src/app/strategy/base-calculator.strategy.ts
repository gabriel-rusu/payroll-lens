import { IncomeBreakdown } from '../model/income-breakdown';
import { Tax } from '../model/tax';
import { Income } from '../model/income';
import { Pay } from '../model/pay';

export abstract class BaseCalculatorStrategy {
  constructor() {}

  abstract computeTaxRates(income: Income | undefined, taxes: Tax[]): IncomeBreakdown;

  protected clone(taxes: Tax[]): Tax[] {
    return [...taxes].map((tax) => Tax.clone(tax));
  }

  protected payAmount(income: Income | undefined): Pay {
    let gross: number = Number(income?.value);
    return new Pay(gross, gross);
  }

  protected processTaxes(taxes: Tax[]) {
    return this.clone(taxes).sort((a, b) => a.order - b.order);
  }
}
