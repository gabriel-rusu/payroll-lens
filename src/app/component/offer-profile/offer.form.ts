import { FormControl, FormGroup } from '@angular/forms';
import { Currency, Frequency, HealthBenefits, WorkPolicy } from '../../util/constants';
import { Perk } from '../../model/perk';

export type OfferForm = FormGroup<{
  jobTitle: FormControl<string>;
  companyName: FormControl<string>;
  baseSalary: FormControl<number>;
  frequency: FormControl<Frequency>;
  salaryCurrency: FormControl<Currency>;
  annualBonusPercentage: FormControl<number>;
  equity: FormControl<number>;
  equityCurrency: FormControl<Currency>;
  vestingPeriod: FormControl<number>;
  vacationDays: FormControl<number>;
  workPolicy: FormControl<WorkPolicy>;
  healthBenefits: FormControl<HealthBenefits>;
  perks: FormControl<Perk[]>;
}>;
