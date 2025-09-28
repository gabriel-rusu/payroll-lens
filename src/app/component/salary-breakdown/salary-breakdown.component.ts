import {Component, effect, input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Income} from '../../shared/model/income.model';
import {Tax} from '../../shared/model/tax.model';
import {DecimalPipe, PercentPipe} from '@angular/common';
import {map} from 'rxjs';
import {PaydayFrequency, TaxOrder, TaxType} from '../../shared/constants';
import {TaxedIncome} from '../../shared/model/taxed-income.model';
import {WorkdayCounterService} from '../../shared/service/workday-counter.service';

class Pay {
  constructor(public remaining: number, public gross: number) {
  }
}

@Component({
  selector: 'app-salary-breakdown',
  imports: [
    DecimalPipe,
    PercentPipe
  ],
  templateUrl: './salary-breakdown.component.html',
  styleUrl: './salary-breakdown.component.css'
})
export class SalaryBreakdownComponent implements OnInit {
  currency = input<string>('RON');
  income = input<Income>();
  taxes: Tax[] = [];
  employeeTaxes: Tax[] = [];
  employerTaxes: Tax[] = [];
  result: TaxedIncome = new TaxedIncome(0, 0);

  constructor(private httpClient: HttpClient, private workdayCounter: WorkdayCounterService) {
    effect(() => {
      if (this.hasSubmittedIncome()) {
        this.taxes.sort((a, b) => a.order - b.order);
        let pay = this.payAmount(this.income());
        for (let tax of this.taxes) {
          if (tax.order == TaxOrder.GROSS) {
            tax.computeValue(pay.gross);
            if (tax.type == 1) {
              pay.remaining -= tax.value;
            }
          } else if (tax.order == TaxOrder.REMAINING) {
            tax.computeValue(pay.remaining);
            if (tax.type == TaxType.EMPLOYEE) {
              pay.remaining -= tax.value;
            }
          }
        }
        this.result = new TaxedIncome(pay.remaining, pay.remaining / pay.gross * 100.0)
      }
    });
  }

  private payAmount(income: Income | undefined): Pay {
    let gross: number = Number(income?.value);
    if (income?.frequency == PaydayFrequency.DAY){
      gross *= 30;
    }
    return new Pay(gross, gross);
  }

  private hasSubmittedIncome = () => {
    return this.income() != null && this.income()?.value != null;
  }

  ngOnInit(): void {
    this.workdayCounter.daysOff(2025, 'US').subscribe(daysOff => {
      console.log(daysOff);
    })
    this.httpClient.get<Tax[]>("./taxes.json").pipe(
      map(res => res.map(tax => Tax.from(tax)))
    ).subscribe({
        next: (taxes: Tax[]) => {
          this.taxes = taxes;
          for (const tax of this.taxes) {
            if (tax.type == TaxType.EMPLOYEE) {
              this.employeeTaxes.push(tax);
            } else {
              this.employerTaxes.push(tax);
            }
          }
        }
      }
    );
  }


}
