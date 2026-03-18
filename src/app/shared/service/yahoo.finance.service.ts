import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class YahooFinanceService {

  constructor(private http: HttpClient) {
  }


  getStockPrice(ticker: string): Observable<number> {
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(yahooUrl)}`;

    return this.http.get(proxyUrl).pipe(map((data: any) => data.chart.result[0].meta.regularMarketPrice));
  }

  findTicker(companyName: string): Observable<any> {
    const url = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(companyName)}&quotes_count=5`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;

    return this.http.get(proxyUrl).pipe(map((data: any) => data.quotes.map((q: any) => ({
      ticker: q.symbol,
      name: q.longname || q.shortname,
      exchange: q.exchange,
      type: q.quoteType,
    }))[0]?.ticker));
  }
}
