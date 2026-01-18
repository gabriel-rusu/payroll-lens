export class LegalDayOff {
  counties: string[];
  countryCode: string;
  color: string;
  date: string;
  fixed: boolean;
  global: boolean;
  launchYear: number;
  localName: string;
  name: string;
  types: string[];
  title: string | undefined;


  constructor(counties: string[], countryCode: string, date: string, fixed: boolean, global: boolean, launchYear: number, localName: string, name: string, types: string[]) {
    this.counties = counties;
    this.countryCode = countryCode;
    this.date = date;
    this.fixed = fixed;
    this.global = global;
    this.launchYear = launchYear;
    this.localName = localName;
    this.name = name;
    this.types = types;
    this.color = 'green';
  }
}
