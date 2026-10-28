import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs';
import { Tax } from '../model/tax';

@Injectable({
  providedIn: 'root',
})
export class TaxService {
  private httpClient = inject(HttpClient);

  // Fetched once and shared by every consumer
  readonly taxes$ = this.httpClient.get<Tax[]>('./taxes.json').pipe(
    map((res) => res.map((tax) => Tax.from(tax))),
    shareReplay(1),
  );
  readonly taxes = toSignal(this.taxes$, { initialValue: [] as Tax[] });
}
