import { Component, inject } from '@angular/core';
import { OfferProfile } from '../../component/offer-profile/offer-profile';
import { Offer } from '../../model/offer';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OfferForm } from '../../component/offer-profile/offer.form';
import { Currency, Frequency, HealthBenefits, WorkPolicy } from '../../util/constants';
import { Perk } from '../../model/perk';



@Component({
  selector: 'app-offer-comparison',
  imports: [OfferProfile, ReactiveFormsModule],
  templateUrl: './offer-comparison.html',
  styleUrl: './offer-comparison.css',
})
export class OfferComparison {
  private formBuilder = inject(NonNullableFormBuilder);
  protected offers = this.formBuilder.group({
    positionAOffer: new FormControl<Offer>({
      jobTitle: '',
      companyName: '',
      baseSalary: 0,
      frequency: Frequency.Monthly,
      salaryCurrency: Currency.RON,
      annualBonusPercentage: 0,
      equity: 0,
      equityCurrency: Currency.USD,
      vestingPeriod: 4,
      vacationDays: 25,
      workPolicy: WorkPolicy.Hybrid,
      healthBenefits: HealthBenefits.BasicCoverage,
      perks: [{ name: 'Gym membership' }],
    }),
    positionBOffer: new FormControl<Offer>({
      jobTitle: '',
      companyName: '',
      baseSalary: 0,
      frequency: Frequency.Monthly,
      salaryCurrency: Currency.RON,
      annualBonusPercentage: 0,
      equity: 0,
      equityCurrency: Currency.USD,
      vestingPeriod: 4,
      vacationDays: 25,
      workPolicy: WorkPolicy.Hybrid,
      healthBenefits: HealthBenefits.BasicCoverage,
      perks: [{ name: 'Gym membership' }],
    }),
  });

  submit() {
    const offer: Offer|null = this.offers.getRawValue().positionAOffer;
    console.log(offer);
  }
}
