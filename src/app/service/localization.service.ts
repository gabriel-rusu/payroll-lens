import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  getCountry() {
    const countryCode = this.getCountryCode();
    // @ts-ignore
    return Countries[countryCode];
  }

  getCountryCode() {
    const timezone = Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone;

    if (timezone === '' || !timezone) {
      return null;
    }

    // @ts-ignore
    return TimeZones[timezone]?.c[0];
  }

  getState() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timezone === '' || !timezone) {
      return null;
    }

    const state = timezone.split('/')[1].replace('_', ' ');

    return state;
  }
}
