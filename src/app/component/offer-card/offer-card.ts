import { Component, computed, input } from '@angular/core';
import { OfferOverview } from '../../model/offer.overview';
import { WorkPolicy, WorkPolicySymbol } from '../../util/constants';
import { MoneyPipe } from '../../pipe/money.pipe';

// One offer's column in the comparison; its rows line up with the parent grid through subgrid
@Component({
  selector: 'app-offer-card',
  imports: [MoneyPipe],
  templateUrl: './offer-card.html',
  host: {
    class:
      'row-span-6 grid grid-rows-subgrid rounded-xl px-8 pt-8 relative overflow-hidden transition-all duration-300',
    '[class]': 'cardCss()',
  },
})
export class OfferCard {
  offer = input.required<OfferOverview>();
  label = input.required<string>();
  labelCss = input('bg-secondary-container text-on-secondary-container');

  protected cardCss = computed(() =>
    this.offer().isWinner
      ? 'bg-surface-container-lowest ring-1 ring-tertiary-fixed shadow-[0px_24px_48px_-12px_rgba(25,28,30,0.08)]'
      : 'bg-surface-container-low',
  );
  protected workPolicySymbol = computed(() => WorkPolicySymbol[this.offer().workPolicy]);

  protected readonly WorkPolicy = WorkPolicy;
}
