import { Component, inject } from '@angular/core';
import { OfferProfile } from '../../component/offer-profile/offer-profile';
import { Offer } from '../../model/offer';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Currency, Frequency, HealthBenefits, IncomeType, WorkPolicy } from '../../util/constants';
import { StorageService } from '../../service/storage.service';
import { ComparissonOverview } from '../../component/comparisson-overview/comparisson-overview';

@Component({
  selector: 'app-offer-comparison',
  imports: [OfferProfile, ReactiveFormsModule, ComparissonOverview],
  templateUrl: './offer-comparison.html',
  styleUrl: './offer-comparison.css',
})
export class OfferComparison {
  private formBuilder = inject(NonNullableFormBuilder);
  protected offers = this.formBuilder.group({
    positionAOffer: new FormControl<Offer>({
      jobTitle: '',
      companyName: '',
      salaryType: IncomeType.NET,
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
      salaryType: IncomeType.NET,
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
  protected offersAreEditable: boolean = true;

  constructor(private storageService: StorageService) {}

  submit() {
    const offers: any = this.offers.getRawValue();
    this.storageService.append('offer-comparison', offers);
    console.log(offers);
    this.offersAreEditable = false;
  }
}
