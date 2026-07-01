import { Component, computed, input, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { FinalOffer } from '../../model/offer-comparison';
import { SalaryCalculator } from '../../pages/salary-calculator/salary-calculator';
import { OfferOverview } from '../../model/offer.overview';
import { FinalOfferOverview } from '../../model/final.offer.overview';
import { Offer } from '../../model/offer';
import { Currency, CurrencySymbol, Frequency, IncomeType } from '../../util/constants';
import { Tax } from '../../model/tax';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseCalculatorStrategy } from '../../strategy/base-calculator.strategy';
import { CalculatorFactory } from '../../strategy/calculator.factory';
import { Income } from '../../model/income';
import { DecimalPipe, formatCurrency } from '@angular/common';

@Component({
  selector: 'app-comparisson-overview',
  imports: [DecimalPipe],
  templateUrl: './comparison-overview.component.html',
  styleUrl: './comparison-overview.component.css',
})
export class ComparisonOverview implements OnInit {
  offers = input.required<FinalOffer>();
  overview = computed<FinalOfferOverview>(() => {
    let overviewA: OfferOverview = this.getOverview(this.offers().positionAOffer);
    let overviewB: OfferOverview = this.getOverview(this.offers().positionBOffer);
    return { offerA: overviewA, offerB: overviewB };
  });

  private taxes: WritableSignal<Tax[]> = signal([]);

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get<Tax[]>('./taxes.json')
      .pipe(map((res) => res.map((tax) => Tax.from(tax))))
      .subscribe({
        next: (taxes: Tax[]) => {
          this.taxes.set(taxes);
        },
      });
  }

  private getOverview(positionOffer: Offer): OfferOverview {
    return {
      jobTitle: positionOffer.jobTitle,
      companyName: positionOffer.companyName,
      baseCompensation: 1000,
      baseCompensationNote: 'TODO',
      takeHomePay: this.computeTakeHomePay(positionOffer),
      takeHomePayNote: this.composeNoteAboutEquity(positionOffer),
      workPolicy: positionOffer.workPolicy,
      perks: positionOffer.perks,
      pto: positionOffer.vacationDays,
      isWinner: true,
    };
  }

  private computeTakeHomePay(positionOffer: Offer) {
    let salary = positionOffer.baseSalary;
    if (positionOffer.frequency == Frequency.Annually) {
      salary /= 12;
    }
    if (positionOffer.salaryType == IncomeType.GROSS) {
      salary = this.afterTaxIncome(salary);
    }

    // TODO: add currency conversion
    salary += (salary * positionOffer.annualBonusPercentage) / 100;

    return salary;
  }

  private afterTaxIncome(salary: number) {
    return CalculatorFactory.get(IncomeType.GROSS).computeTaxRates(
      new Income('', '', salary, ''),
      this.taxes(),
    ).netIncome;
  }

  private composeNoteAboutEquity(positionOffer: Offer) {
    let monthlyEquity = 0;
    let defaultMessage = `with annual bonus included in the above numbers`;
    if (positionOffer.equity != null && positionOffer.equity > 0) {
      monthlyEquity = positionOffer.equity / (positionOffer.vestingPeriod * 12);
    } else {
      return defaultMessage;
    }

    return (
      defaultMessage +
      `and ~${CurrencySymbol[positionOffer.equityCurrency]}${monthlyEquity.toFixed(2)}/month pre tax or ~${CurrencySymbol[positionOffer.equityCurrency]}${(monthlyEquity * 0.9).toFixed(2)}/month after tax from the equity received in the first ${positionOffer.vestingPeriod * 12} months`
    );
  }
}
