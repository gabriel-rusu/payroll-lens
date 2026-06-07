import { Component, forwardRef, inject, input, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ChipDropdown } from '../chip-dropdown/chip-dropdown';
import { Perk } from '../../model/perk';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OfferForm } from './offer.form';
import { Currency, Frequency, HealthBenefits, WorkPolicy } from '../../util/constants';
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
  ]
})
export class OfferProfile implements ControlValueAccessor, OnInit, OnDestroy {
  //TODO: put this into a json
  protected allPerks: Perk[] = [
    { name: 'Gym Membership' },
    { name: 'Remote Stipend' },
    { name: 'Health Insurance' },
    { name: '401k Match' },
    { name: 'Unlimited PTO' },
    { name: 'Stock Options' },
    { name: 'Learning Budget' },
    { name: 'Meal Allowance' },
    { name: 'Childcare' },
    { name: 'Commuter Benefits' },
  ];
  offerLabel = input.required<string>();
  private formBuilder = inject(NonNullableFormBuilder);

  form: OfferForm = this.formBuilder.group({
    jobTitle: ['', Validators.required],
    companyName: ['', Validators.required],
    baseSalary: [0, [Validators.required, Validators.min(0)]],
    frequency: [Frequency.Monthly, Validators.required],
    salaryCurrency: [Currency.USD, Validators.required],
    annualBonusPercentage: [0, [Validators.min(0), Validators.max(100)]],
    equity: [0, Validators.min(0)],
    equityCurrency: [Currency.RON],
    vestingPeriod: [0, [Validators.min(0), Validators.max(100)]],
    vacationDays: [0, Validators.min(0)],
    workPolicy: [WorkPolicy.Hybrid, Validators.required],
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
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Parent sets a value (patchValue / setValue / initial value)
  writeValue(value: Offer): void {
    if (value) {
      this.form.setValue(value, { emitEvent: false }); // emitEvent:false avoids a loop
    }
  }

  registerOnChange(fn: (value: Offer) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
