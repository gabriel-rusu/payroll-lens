import { Component, computed, input, Input } from '@angular/core';
import { FinalOffer } from '../../model/offer-comparison';
import { SalaryCalculator } from '../../pages/salary-calculator/salary-calculator';
import { OfferOverview } from '../../model/offer.overview';
import { FinalOfferOverview } from '../../model/final.offer.overview';
import { Offer } from '../../model/offer';

@Component({
  selector: 'app-comparisson-overview',
  imports: [],
  templateUrl: './comparison-overview.component.html',
  styleUrl: './comparison-overview.component.css',
})
export class ComparisonOverview {
  offers = input.required<FinalOffer>();
  overview = computed<FinalOfferOverview>(() => {
    let overviewA: OfferOverview = this.getOverview(this.offers().positionAOffer);
    let overviewB: OfferOverview = this.getOverview(this.offers().positionBOffer);
    return { offerA: overviewA, offerB: overviewB };
  });
  private getOverview(positionOffer: Offer): OfferOverview {
    return {
      jobTitle: positionOffer.jobTitle,
      companyName: positionOffer.companyName,
      baseCompensation: 1000,
      baseCompensationNote: 'TODO',
      takeHomePay: 1000,
      takeHomePayNote: 'TODO',
      workPolicy: positionOffer.workPolicy,
      perks: positionOffer.perks,
      pto: positionOffer.vacationDays,
      isWinner: true
    };
  }
}
