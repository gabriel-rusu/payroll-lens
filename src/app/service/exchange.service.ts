import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangeRate } from '../model/exchange.rate';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {

  constructor(private httpClient: HttpClient) {}

  exchangeRates(baseCurrency: string, currencies: string[]): Observable<ExchangeRate[]> {
    return this.httpClient.get<ExchangeRate[]>(`https://api.frankfurter.dev/v2/rates?base=${baseCurrency}&quotes=${currencies.join(',')}`);
  }


}
