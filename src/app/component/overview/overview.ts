import { Component, computed, input, signal, WritableSignal } from '@angular/core';
import { FinalOfferOverview } from '../../model/final.offer.overview';
import { FinalOffer } from '../../model/offer-comparison';
import { OfferOverview } from '../../model/offer.overview';
import { HttpClient } from '@angular/common/http';
import { Tax } from '../../model/tax';
import { map } from 'rxjs';
import { Offer } from '../../model/offer';
import { CurrencySymbol, Frequency, IncomeType } from '../../util/constants';
import { CalculatorFactory } from '../../strategy/calculator.factory';
import { Income } from '../../model/income';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-overview',
  imports: [DecimalPipe],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  offer = input.required<any>();
  overview = computed<OfferOverview>(() => {
    return this.getOverview(this.offer());
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
