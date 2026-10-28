import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FinalOffer } from '../../model/offer-comparison';
import { FinalOfferOverview } from '../../model/final.offer.overview';
import { Offer } from '../../model/offer';
import { ConversionRates } from '../../model/exchange.rate';
import { TaxService } from '../../service/tax.service';
import { ExchangeService } from '../../service/exchange.service';
import { buildOfferOverview } from '../../util/offer.calculations';
import { compareOffers } from '../../util/offer.comparison';
import { OfferCard } from '../offer-card/offer-card';
import { ComparisonLabels } from '../comparison-labels/comparison-labels';

@Component({
  selector: 'app-comparisson-overview',
  imports: [OfferCard, ComparisonLabels],
  templateUrl: './comparison-overview.component.html',
  styleUrl: './comparison-overview.component.css',
})
export class ComparisonOverview {
  offers = input.required<FinalOffer>();

  private taxes = inject(TaxService).taxes;
  private exchangeService = inject(ExchangeService);
  // Both offers are expressed in Offer A's salary currency so they can be compared
  private comparisonCurrency = computed(() => this.offers().positionAOffer.salaryCurrency);
  private conversionRates = rxResource({
    params: () => ({
      target: this.comparisonCurrency(),
      sources: [this.offers().positionAOffer.salaryCurrency, this.offers().positionBOffer.salaryCurrency],
    }),
    stream: ({ params }) => this.exchangeService.conversionRates(params.target, params.sources),
    defaultValue: {},
  });

  overview = computed<FinalOfferOverview>(() => {
    // Without rates (e.g. the request failed) each offer stays in its own currency
    const rates: ConversionRates = this.conversionRates.hasValue() ? this.conversionRates.value() : {};
    const overviewOf = (offer: Offer) =>
      buildOfferOverview(offer, this.taxes(), this.comparisonCurrency(), rates);
    return compareOffers(overviewOf(this.offers().positionAOffer), overviewOf(this.offers().positionBOffer));
  });
}
