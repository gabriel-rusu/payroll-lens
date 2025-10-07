import {Component, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Income} from '../../shared/model/income.model';
import {Currency, IncomeType, PaydayFrequency} from '../../shared/constants';
import {enumerate} from '../../shared/util.functions';
import {Benefits} from '../../shared/model/benefits.model';


@Component({
  selector: 'app-calculator',
  imports: [
    FormsModule
  ],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css'
})
export class Calculator {
  protected readonly Currency = Currency;
  protected readonly enumerate = enumerate;
  protected readonly PaydayFrequency = PaydayFrequency;

  showBenefits = false;
  income = output<Income>();
  defaultIncome = new Income(IncomeType.GROSS, Currency.RON, 0, PaydayFrequency.MONTH);
  benefits = output<Benefits>();
  defaultBenefits = new Benefits();

  computeTaxes() {
    this.income.emit(JSON.parse(JSON.stringify(this.defaultIncome)));
    if(this.showBenefits) {
      console.log(this.showBenefits);
      this.benefits.emit(JSON.parse(JSON.stringify(this.defaultBenefits)));
    }
  }


  displayBenefits() {
    this.showBenefits = true;
  }

  hideBenefits() {
    this.showBenefits = false;
  }
}
