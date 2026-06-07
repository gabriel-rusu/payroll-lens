import { Currency, Frequency, HealthBenefits, WorkPolicy } from '../util/constants';
import { Perk } from './perk';

export interface Offer {
  jobTitle: string;
  companyName: string;
  baseSalary: number;
  frequency: Frequency;
  salaryCurrency: Currency;
  annualBonusPercentage: number;
  equity: number;
  equityCurrency: Currency;
  vestingPeriod: number;
  vacationDays: number;
  workPolicy: WorkPolicy;
  healthBenefits: HealthBenefits;
  perks: Perk[];
}
