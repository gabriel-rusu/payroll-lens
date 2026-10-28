import { Offer } from '../model/offer';
import { Currency, Frequency, HealthBenefits, IncomeType, WorkPolicy } from './constants';

export function defaultOffer(overrides: Partial<Offer> = {}): Offer {
  return {
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
    onSiteWorkDays: 3,
    healthBenefits: HealthBenefits.BasicCoverage,
    perks: [
      {
        name: 'Gym membership',
        iconCss: 'material-symbols-outlined text-base',
        iconName: 'fitness_center',
        iconSymbol: 'fitness_center',
      },
    ],
    ...overrides,
  };
}
