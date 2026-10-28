import { FinalOffer } from './offer-comparison';

export interface SavedComparison {
  id: string;
  savedAt: string;
  offers: FinalOffer;
}
