import {Component, effect, input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Income} from '../../shared/model/income.model';
import {Tax} from '../../shared/model/tax.model';
import {DecimalPipe, PercentPipe} from '@angular/common';
import {map} from 'rxjs';
import {TaxType} from '../../shared/constants';
import {WorkdayCounterService} from '../../shared/service/workday-counter.service';
import {CalculatorFactory} from '../../shared/strategy/calculator.factory';
import {IncomeBreakdown} from '../../shared/model/income-breakdown.model';


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
  taxes: Tax[] = [];
  employerTotal: number = 0;
  employeeTaxes: Tax[] = [];
  employerTaxes: Tax[] = [];
  income = input<Income>();
  currency = input<string>('RON');
  incomeBreakdown = new IncomeBreakdown(0, 0, 0, []);


  constructor(private httpClient: HttpClient, workdayCounter: WorkdayCounterService) {
    effect(() => {
      if (this.hasSubmittedIncome()) {
        let calculator = CalculatorFactory.get(workdayCounter, this.income()?.type);
        this.incomeBreakdown = calculator.computeTaxRates(this.income(), this.taxes);
        this.employeeTaxes = this.incomeBreakdown.taxRates.filter(tax => tax.type == TaxType.EMPLOYEE);
        this.employerTaxes = this.incomeBreakdown.taxRates.filter(tax => tax.type == TaxType.EMPLOYER);
        this.employerTotal = this.employerTaxes.map(tax => tax.value)
          .reduce((total: number, current: number) => total + current) + this.incomeBreakdown.grossIncome;
      }
    });
  }


  private hasSubmittedIncome = () => {
    return this.income() != null && this.income()?.value != null;
  }

  ngOnInit(): void {
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
