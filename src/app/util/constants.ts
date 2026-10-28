export enum TaxType {
  EMPLOYEE = 1,
  EMPLOYER = 2,
}

export enum IncomeType {
  GROSS = 'Gross',
  NET = 'Net',
}

export enum TaxOrder {
  GROSS = 1,
  REMAINING = 2,
}

export enum Frequency {
  Annually = 'Annually',
  Monthly = 'Monthly',
}

export enum HealthBenefits {
  PrivateInsurance = 'Private Insurance',
  PremiumCoverage = 'Premium Coverage',
  BasicCoverage = 'Basic Coverage',
}

export enum Currency {
  USD = 'USD',
  EURO = 'EURO',
  RON = 'RON',
}

export const CurrencySymbol = {
  USD: '$',
  EURO: '€',
  RON: 'RON',
};

export const CurrencyIsoCode = {
  USD: 'USD',
  EURO: 'EUR',
  RON: 'RON',
};

export enum WorkPolicy {
  Hybrid = 'Hybrid',
  Remote = 'Remote',
  OnSite = 'On-Site',
}

export const WorkPolicySymbol = {
  Hybrid: 'home_work',
  Remote: 'language',
  'On-Site': 'apartment',
};
