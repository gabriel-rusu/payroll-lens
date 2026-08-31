export interface OutOfOfficeInterval {
  date: Date,
  numberOfDays: number,
  name: string,

  getMonth(): string;
  getDay(): string;
}
