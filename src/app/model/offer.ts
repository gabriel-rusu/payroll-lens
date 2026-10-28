import { Currency, Frequency, HealthBenefits, IncomeType, WorkPolicy } from '../util/constants';
import { Perk } from './perk';

export interface Offer {
  jobTitle: string;
  companyName: string;
  salaryType: IncomeType;
  baseSalary: number;
  frequency: Frequency;
  salaryCurrency: Currency;
  annualBonusPercentage: number;
  equity: number;
  equityCurrency: Currency;
  vestingPeriod: number;
  vacationDays: number;
  workPolicy: WorkPolicy;
  onSiteWorkDays: number;
  healthBenefits: HealthBenefits;
  perks: Perk[];
}
