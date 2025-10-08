import {Component, effect, input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Income} from '../../shared/model/income.model';
import {Tax} from '../../shared/model/tax.model';
import {DecimalPipe, PercentPipe} from '@angular/common';
import {map} from 'rxjs';
import {PaydayFrequency, TaxOrder, TaxType} from '../../shared/constants';
import {TaxedIncome} from '../../shared/model/taxed-income.model';
import {WorkdayCounterService} from '../../shared/service/workday-counter.service';
import {CalculatorFactory} from '../../shared/strategy/calculator.factory';


@Component({
  selector: 'app-salary-breakdown',
  imports: [
    DecimalPipe,
    PercentPipe
  ],
  templateUrl: './salary-breakdown.html',
  styleUrl: './salary-breakdown.css'
})
export class SalaryBreakdown implements OnInit {
  currency = input<string>('RON');
  income = input<Income>();

  taxes: Tax[] = [];
  employerTotal: number = 0;
  employeeTaxes: Tax[] = [];
  employerTaxes: Tax[] = [];
  result: TaxedIncome = new TaxedIncome(0, 0);

  constructor(private httpClient: HttpClient, private workdayCounter: WorkdayCounterService) {
    effect(() => {
      if (this.hasSubmittedIncome()) {
        let calculator = CalculatorFactory.get(this.income()?.type);
        let incomeBreakdown = calculator.computeTaxRates(this.income(), this.taxes);
        this.employeeTaxes = incomeBreakdown.taxRates.filter(tax => tax.type == TaxType.EMPLOYEE);
        this.employerTaxes = incomeBreakdown.taxRates.filter(tax => tax.type == TaxType.EMPLOYER);
        this.result = new TaxedIncome(incomeBreakdown.netIncome, incomeBreakdown.netToGrossRation);
        this.employerTotal = this.employerTaxes.map(tax => tax.value)
          .reduce((total: number, current: number) => total + current) + incomeBreakdown.grossIncome;
      }
    });
  }


  private hasSubmittedIncome = () => {
    return this.income() != null && this.income()?.value != null;
  }

  ngOnInit(): void {

    this.workdayCounter.getNumberOfWorkingDays().subscribe(workingDays => {
      console.log('workingDays: ', workingDays);
    });
    this.httpClient.get<Tax[]>("./taxes.json").pipe(
      map(res => res.map(tax => Tax.from(tax)))
    ).subscribe({
        next: (taxes: Tax[]) => {
          this.taxes = taxes;
        }
      }
    );
  }
}
