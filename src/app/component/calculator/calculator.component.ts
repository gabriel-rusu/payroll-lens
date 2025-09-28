import {Component, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Income} from '../../shared/model/income.model';
import {Currency, IncomeType, PaydayFrequency, TaxType} from '../../shared/constants';
import {enumerate} from '../../shared/util.functions';


@Component({
  selector: 'app-calculator',
  imports: [
    FormsModule
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  protected readonly enumerate = enumerate;
  protected readonly PaydayFrequency = PaydayFrequency;

  defaultIncome = new Income(IncomeType.GROSS, Currency.RON, 0, PaydayFrequency.MONTH);
  income = output<Income>();

  computeTaxes() {
    this.income.emit(JSON.parse(JSON.stringify(this.defaultIncome)));
  }


  protected readonly Currency = Currency;
}
