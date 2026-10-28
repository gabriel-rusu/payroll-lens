import { Component, inject, signal } from '@angular/core';
import { OfferProfile } from '../../component/offer-profile/offer-profile';
import { Offer } from '../../model/offer';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ComparisonOverview } from '../../component/comparisson-overview/comparison-overview.component';
import { ComparisonHistory } from '../../component/comparison-history/comparison-history';
import { FinalOffer } from '../../model/offer-comparison';
import { ComparisonHistoryService } from '../../service/comparison-history.service';
import { defaultOffer } from '../../util/offer.defaults';

@Component({
  selector: 'app-offer-comparison',
  imports: [OfferProfile, ReactiveFormsModule, ComparisonOverview, ComparisonHistory],
  templateUrl: './offer-comparison.html',
  styleUrl: './offer-comparison.css',
})
export class OfferComparison {
  private formBuilder = inject(NonNullableFormBuilder);
  private history = inject(ComparisonHistoryService);
  protected finalOffers!: FinalOffer;
  protected offers = this.formBuilder.group({
    positionAOffer: new FormControl<Offer>(defaultOffer()),
    positionBOffer: new FormControl<Offer>(defaultOffer()),
  });
  protected offersAreEditable: boolean = true;
  protected savedComparisons = this.history.comparisons;
  // Saved comparison currently in the form; saving updates it instead of adding a new one
  protected activeId = signal<string | null>(null);

  constructor() {
    const latest = this.savedComparisons()[0];
    if (latest) {
      this.load(latest.offers);
      this.activeId.set(latest.id);
    }
  }

  submit() {
    this.save();
    this.offersAreEditable = false;
  }

  protected save() {
    this.finalOffers = <FinalOffer>this.offers.getRawValue();
    this.activeId.set(this.history.save(this.finalOffers, this.activeId() ?? undefined));
  }

  protected newComparison() {
    this.load({});
    this.activeId.set(null);
    this.offersAreEditable = true;
  }

  protected open(id: string) {
    const comparison = this.history.find(id);
    if (!comparison) {
      return;
    }
    this.load(comparison.offers);
    this.finalOffers = <FinalOffer>this.offers.getRawValue();
    this.activeId.set(id);
    this.offersAreEditable = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected remove(id: string) {
    if (!confirm('Delete this saved comparison? This cannot be undone.')) {
      return;
    }
    this.history.remove(id);
    // The form keeps its content, now as an unsaved comparison
    if (this.activeId() == id) {
      this.activeId.set(null);
    }
  }

  // Older saves may miss fields added since, so they are merged over the defaults
  private load(offers: Partial<FinalOffer>) {
    this.offers.setValue({
      positionAOffer: defaultOffer(offers.positionAOffer),
      positionBOffer: defaultOffer(offers.positionBOffer),
    });
  }
}
