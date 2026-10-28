import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';
import { Currency, CurrencySymbol } from '../util/constants';

export function formatMoney(value: number, currency: Currency): string {
  const amount = formatNumber(Math.abs(value), 'en-US', '1.0-0');
  const sign = value < 0 ? '-' : '';
  return currency == Currency.RON
    ? `${sign}${amount} RON`
    : `${sign}${CurrencySymbol[currency]}${amount}`;
}

@Pipe({
  name: 'money',
})
export class MoneyPipe implements PipeTransform {
  transform(value: number, currency: Currency): string {
    return formatMoney(value, currency);
  }
}
