import {Component, effect, input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Income} from '../../shared/model/income.model';
import {Tax} from '../../shared/model/tax.model';
import {DecimalPipe} from '@angular/common';


@Component({
  selector: 'app-salary-breakdown',
  imports: [
    DecimalPipe
  ],
  templateUrl: './salary-breakdown.component.html',
  styleUrl: './salary-breakdown.component.css'
})
export class SalaryBreakdownComponent implements OnInit {
  currency = input<string>('RON');
  income = input<Income>();
  taxes: Tax[] = [];
  result: {
    value: number;
    percentage: number;
  } = {
    value: 0,
    percentage: 0,
  };

  constructor(private httpClient: HttpClient) {
    effect(() => {
      if (this.income()) {
        this.taxes.sort((a, b) => a.order - b.order);
        console.log('---------------------------');
        let referenceIncome = this.income()?.value;
        for (let tax of this.taxes) {
          if (referenceIncome) {
            tax.value = referenceIncome * (Number(tax.quota) / 100.0);
            referenceIncome -= tax.value;
          }
        }
        if (referenceIncome && this.income()?.value) {
          this.result.value = referenceIncome;
          // @ts-ignore
          this.result.percentage = referenceIncome / this.income()?.value * 100.0;
        }
      }
    });

  }

  ngOnInit(): void {

    this.httpClient.get<Tax[]>("./taxes.json").subscribe({
        next: (res: Tax[]) => {
          console.log("Taxes");
          console.log(res);
          this.taxes = res;
        }
      }
    );

  }


}
