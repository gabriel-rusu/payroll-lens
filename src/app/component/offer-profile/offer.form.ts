import { FormControl, FormGroup } from '@angular/forms';
import { Currency, Frequency, HealthBenefits, IncomeType, WorkPolicy } from '../../util/constants';
import { Perk } from '../../model/perk';

export type OfferForm = FormGroup<{
  jobTitle: FormControl<string>;
  companyName: FormControl<string>;
  salaryType: FormControl<IncomeType>;
  baseSalary: FormControl<number>;
  frequency: FormControl<Frequency>;
  salaryCurrency: FormControl<Currency>;
  annualBonusPercentage: FormControl<number>;
  equity: FormControl<number>;
  equityCurrency: FormControl<Currency>;
  vestingPeriod: FormControl<number>;
  vacationDays: FormControl<number>;
  workPolicy: FormControl<WorkPolicy>;
  onSiteWorkDays: FormControl<number>;
  healthBenefits: FormControl<HealthBenefits>;
  perks: FormControl<Perk[]>;
}>;
