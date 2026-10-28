import {
  Component,
  forwardRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ChipDropdown } from '../chip-dropdown/chip-dropdown';
import { Perk } from '../../model/perk';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OfferForm } from './offer.form';
import { Currency, Frequency, HealthBenefits, IncomeType, WorkPolicy } from '../../util/constants';
import { FormattedNumberDirective } from '../../directive/formatted.number';
import { Subscription } from 'rxjs';
import { Offer } from '../../model/offer';

@Component({
  selector: 'app-offer-profile',
  imports: [ChipDropdown, ReactiveFormsModule, FormattedNumberDirective],
  templateUrl: './offer-profile.html',
  styleUrl: './offer-profile.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OfferProfile),
      multi: true,
    },
  ],
})
export class OfferProfile implements ControlValueAccessor, OnInit, OnDestroy {
  //TODO: put this into a json
  protected allPerks: Perk[] = [
    {
      name: 'Gym Membership',
      iconCss: 'material-symbols-outlined text-base',
      iconSymbol: 'fitness_center',
      iconName: 'fitness_center',
    },
    {
      name: 'Health Insurance',
      iconCss: 'material-symbols-outlined text-base',
      iconSymbol: 'health_and_safety',
      iconName: 'health_and_safety',
    },
    {
      name: 'Unlimited PTO',
      iconCss: 'material-symbols-outlined text-base',
      iconSymbol: 'beach_access',
      iconName: 'beach_access',
    },
    {
      name: 'Stock Options',
      iconCss: 'material-symbols-outlined text-base',
      iconSymbol: 'trending_up',
      iconName: 'trending_up',
    },
    {
      name: 'Learning Budget',
      iconCss: 'material-symbols-outlined text-base',
      iconSymbol: 'school',
      iconName: 'school',
    },
    {
      name: 'Meal Allowance',
      iconCss: 'material-symbols-outlined text-base',
      iconSymbol: 'restaurant',
      iconName: 'restaurant',
    },
    {
      name: 'Childcare',
      iconCss: 'material-symbols-outlined text-base',
      iconSymbol: 'child_care',
      iconName: 'child_care',
    },
    {
      name: 'Commuter Benefits',
      iconCss: 'material-symbols-outlined text-base',
      iconSymbol: 'directions_transit',
      iconName: 'directions_transit',
    },
    {
      name: 'Wellness Budget',
      iconCss: 'material-symbols-outlined text-base',
      iconSymbol: 'self_improvement',
      iconName: 'self_improvement',
    },
    {
      name: 'Floating Days',
      iconCss: 'material-symbols-outlined text-base',
      iconSymbol: 'calendar_month',
      iconName: 'calendar_month',
    },
    {
      name: 'Birthday Paid Leave',
      iconCss: 'material-symbols-outlined text-base',
      iconSymbol: 'cake',
      iconName: 'cake',
    },
  ];

  offerLabel = input.required<string>();
  private formBuilder = inject(NonNullableFormBuilder);

  form: OfferForm = this.formBuilder.group({
    jobTitle: ['', Validators.required],
    companyName: ['', Validators.required],
    salaryType: [IncomeType.NET, Validators.required],
    baseSalary: [0, [Validators.required, Validators.min(0)]],
    frequency: [Frequency.Monthly, Validators.required],
    salaryCurrency: [Currency.USD, Validators.required],
    annualBonusPercentage: [0, [Validators.min(0), Validators.max(100)]],
    equity: [0, Validators.min(0)],
    equityCurrency: [Currency.RON],
    vestingPeriod: [0, [Validators.min(0), Validators.max(100)]],
    vacationDays: [0, Validators.min(0)],
    workPolicy: [WorkPolicy.Hybrid, Validators.required],
    onSiteWorkDays: [0, Validators.required],
    healthBenefits: [HealthBenefits.PrivateInsurance],
    perks: [[] as Perk[]],
  });

  protected supportedCurrencies(): string[] {
    return Object.values(Currency);
  }

  protected supportedFrequencies() {
    return Object.values(Frequency);
  }

  protected supportedHealthBenefits() {
    return Object.values(HealthBenefits);
  }

  protected supportedWorkPolicy() {
    return Object.values(WorkPolicy);
  }

  private onChange: (value: Offer) => void = () => {};
  private onTouched: () => void = () => {};
  private sub!: Subscription;

  ngOnInit() {
    // Push every internal change up to the parent form
    this.sub = this.form.valueChanges.subscribe(() => {
      this.onChange(this.form.getRawValue());
      this.onTouched();
    });

    this.form?.get('workPolicy')?.valueChanges.subscribe((policy: WorkPolicy) => {
      const defaultDays = { [WorkPolicy.OnSite]: 5, [WorkPolicy.Remote]: 0, [WorkPolicy.Hybrid]: 1 };
      this.form?.get('onSiteWorkDays')?.setValue(defaultDays[policy]);
      this.syncOnSiteWorkDays(policy);
    });
  }

  // On-site days are only editable for hybrid offers
  private syncOnSiteWorkDays(policy: WorkPolicy) {
    const onSiteWorkDays = this.form?.get('onSiteWorkDays');
    if (policy == WorkPolicy.Hybrid) {
      onSiteWorkDays?.enable({ emitEvent: false });
    } else {
      onSiteWorkDays?.disable({ emitEvent: false });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Parent sets a value (patchValue / setValue / initial value)
  writeValue(value: Offer): void {
    if (value) {
      this.form.setValue(value, { emitEvent: false }); // emitEvent:false avoids a loop
      this.syncOnSiteWorkDays(value.workPolicy);
    }
  }

  registerOnChange(fn: (value: Offer) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected supportedCSalaryType() {
    return Object.values(IncomeType);
  }
}
