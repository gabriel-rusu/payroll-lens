import { Component, input, output } from '@angular/core';
import { DatePipe, LowerCasePipe, NgTemplateOutlet } from '@angular/common';
import { SavedComparison } from '../../model/saved-comparison';
import { Offer } from '../../model/offer';
import { Frequency } from '../../util/constants';
import { MoneyPipe } from '../../pipe/money.pipe';

// Table of saved comparisons with actions to reopen or delete each one
@Component({
  selector: 'app-comparison-history',
  imports: [DatePipe, LowerCasePipe, NgTemplateOutlet, MoneyPipe],
  templateUrl: './comparison-history.html',
})
export class ComparisonHistory {
  comparisons = input.required<SavedComparison[]>();
  activeId = input<string | null>(null);
  opened = output<string>();
  removed = output<string>();

  protected title(offer: Offer) {
    return offer.jobTitle || 'Untitled position';
  }

  protected period(offer: Offer) {
    return offer.frequency == Frequency.Annually ? 'yr' : 'mo';
  }
}
