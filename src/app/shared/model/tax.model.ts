import {TaxOrder, TaxType} from '../constants';

export class Tax {

  constructor(public name: string, public symbol: string, public type: TaxType,
              public quota: number, public order: TaxOrder, public value: number) {
  }

  computeValue(income: number): number {
    const taxValue = income * (Number(this.quota) / 100.0);
    this.value = taxValue;
    return taxValue;
  }

  static from(json: any) {
    return Object.assign(new Tax('', '', TaxType.EMPLOYEE, 0, TaxOrder.GROSS, 0), json);
  }
}
