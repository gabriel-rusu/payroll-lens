
import { NetCalculatorStrategy } from './net-calculator.strategy';
import { BaseCalculatorStrategy } from './base-calculator.strategy';
import { GrossCalculatorStrategy } from './gross-calculator.strategy';
import { IncomeType } from '../util/constants';

export class CalculatorFactory {
  static get(type: string | undefined): BaseCalculatorStrategy {
    if (type === IncomeType.GROSS) {
      return new NetCalculatorStrategy();
    } else if (type === IncomeType.NET) {
      return new GrossCalculatorStrategy();
    } else {
      throw new Error(`${type} is not an implemented calculator.`);
    }
  }
}
