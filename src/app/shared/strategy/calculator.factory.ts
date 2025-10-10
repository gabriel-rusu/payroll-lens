import {IncomeType} from '../constants';
import {NetCalculatorStrategy} from './net-calculator.strategy';
import {BaseCalculatorStrategy} from './base-calculator.strategy';
import {GrossCalculatorStrategy} from './gross-calculator.strategy';
import {WorkdayCounterService} from '../service/workday-counter.service';

export class CalculatorFactory {

  static get(workdayCounter: WorkdayCounterService, type: string | undefined): BaseCalculatorStrategy {
    if (type === IncomeType.GROSS) {
      return new NetCalculatorStrategy(workdayCounter);
    } else if (type === IncomeType.NET) {
      return  new GrossCalculatorStrategy(workdayCounter);
    } else {
      throw new Error(`${type} is not an implemented calculator.`);
    }
  }
}
