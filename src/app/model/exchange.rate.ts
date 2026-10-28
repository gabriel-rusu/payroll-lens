import { Currency } from '../util/constants';

export interface ExchangeRate {
  base: string;
  date: string;
  quote: string;
  rate: number;
}

// Multiplier converting an amount in each currency into a target currency
export type ConversionRates = Partial<Record<Currency, number>>;
