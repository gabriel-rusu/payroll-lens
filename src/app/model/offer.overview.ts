import { Perk } from './perk';
import { Currency, WorkPolicy } from '../util/constants';

export type ComparisonCategory = 'baseCompensation' | 'takeHomePay' | 'perks' | 'workPolicy' | 'pto';

// Rows of the comparison, in display order
export const ComparisonCategories: { category: ComparisonCategory; label: string }[] = [
  { category: 'baseCompensation', label: 'Base Compensation' },
  { category: 'takeHomePay', label: 'Take Home Pay' },
  { category: 'perks', label: 'Perks & Benefits' },
  { category: 'workPolicy', label: 'Work Policy' },
  { category: 'pto', label: 'PTO / Vacation' },
];

export interface OfferOverview {
  jobTitle: string;
  companyName: string;
  baseCompensation: number;
  baseCompensationCurrency: Currency;
  baseCompensationNote: string;
  takeHomePay: number;
  takeHomePayNote: string;
  perks: Perk[];
  workPolicy: WorkPolicy;
  onSiteWorkDays: number;
  pto: number;
  isWinner: boolean;
  wins: Partial<Record<ComparisonCategory, boolean>>;
  baseCompensationDelta?: number;
  takeHomePayDelta?: number;
}
