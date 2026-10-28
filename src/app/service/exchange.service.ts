import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { ConversionRates, ExchangeRate } from '../model/exchange.rate';
import { Currency, CurrencyIsoCode } from '../util/constants';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {

  constructor(private httpClient: HttpClient) {}

  exchangeRates(baseCurrency: string, currencies: string[]): Observable<ExchangeRate[]> {
    return this.httpClient.get<ExchangeRate[]>(`https://api.frankfurter.dev/v2/rates?base=${baseCurrency}&quotes=${currencies.join(',')}`);
  }

  // Rates for converting `sources` into `target`; currencies without a quote are left out
  conversionRates(target: Currency, sources: Currency[]): Observable<ConversionRates> {
    const quotes = [...new Set(sources.filter((currency) => currency != target))];
    if (quotes.length == 0) {
      return of({});
    }
    return this.exchangeRates(
      CurrencyIsoCode[target],
      quotes.map((currency) => CurrencyIsoCode[currency]),
    ).pipe(
      map((rates) =>
        Object.fromEntries(
          quotes.flatMap((currency) => {
            const rate = rates.find((rate) => rate.quote == CurrencyIsoCode[currency]);
            return rate ? [[currency, 1 / rate.rate]] : [];
          }),
        ),
      ),
    );
  }
}
