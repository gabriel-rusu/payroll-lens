import { Perk } from './perk';
import { WorkPolicy } from '../util/constants';

export interface OfferOverview {
  jobTitle: string;
  companyName: string;
  baseCompensation: number;
  baseCompensationNote: string;
  takeHomePay: number
  takeHomePayNote: string
  perks: Perk[]
  workPolicy: WorkPolicy;
  pto: number;
  isWinner?: boolean;
}
