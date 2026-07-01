import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { OfferProfile } from '../../component/offer-profile/offer-profile';
import { Offer } from '../../model/offer';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Currency, Frequency, HealthBenefits, IncomeType, WorkPolicy } from '../../util/constants';
import { StorageService } from '../../service/storage.service';
import { ComparisonOverview } from '../../component/comparisson-overview/comparison-overview.component';
import { FinalOffer } from '../../model/offer-comparison';


@Component({
  selector: 'app-offer-comparison',
  imports: [OfferProfile, ReactiveFormsModule, ComparisonOverview],
  templateUrl: './offer-comparison.html',
  styleUrl: './offer-comparison.css',
})
export class OfferComparison implements AfterViewInit {
  private formBuilder = inject(NonNullableFormBuilder);
  protected finalOffers!: FinalOffer;
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
      perks: [
        {
          name: 'Gym membership',
          iconCss: 'material-symbols-outlined text-base',
          iconName: 'fitness_center',
          iconSymbol: 'fitness_center',
        },
      ],
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
      perks: [
        {
          name: 'Gym membership',
          iconCss: 'material-symbols-outlined text-base',
          iconName: 'fitness_center',
          iconSymbol: 'fitness_center',
        },
      ],
    }),
  });
  protected offersAreEditable: boolean = true;

  constructor(private storageService: StorageService) {}

  submit() {
    this.finalOffers = <FinalOffer>this.offers.getRawValue();
    this.storageService.append('offer-comparison', this.finalOffers);
    console.log(this.finalOffers);
    this.offersAreEditable = false;
  }

  ngAfterViewInit(): void {
    console.log('Here?');
    console.log(this.storageService.get('offer-comparison'));
    this.offers.patchValue(
      this.storageService.get('offer-comparison')[
        this.storageService.get('offer-comparison').length-1
      ],
    );
  }
}
