import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkdayCounterService {
  constructor(private httpClient: HttpClient) {
  }


  daysOff(year: number, country: string) {
    return this.httpClient.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`)
  }
}
