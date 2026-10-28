import { Component } from '@angular/core';
import { ComparisonCategories } from '../../model/offer.overview';

// Category labels column; its rows line up with the offer cards through subgrid
@Component({
  selector: 'app-comparison-labels',
  host: {
    class: 'row-span-6 grid grid-rows-subgrid pt-8',
  },
  template: `
    <!-- Offer header row -->
    <div></div>
    @for (row of categories; track row.category) {
      <div class="min-h-36 py-8 flex items-center"
           [class.border-t]="row.category == 'perks'"
           [class.border-outline-variant/20]="row.category == 'perks'">
        <span class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
          {{ row.label }}
        </span>
      </div>
    }
  `,
})
export class ComparisonLabels {
  protected readonly categories = ComparisonCategories;
}
