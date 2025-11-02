import {Currency, PaydayFrequency} from '../constants';

export class MealTicket {
  value: number = 0;
  frequency: PaydayFrequency = PaydayFrequency.DAY;
  currency: Currency = Currency.RON;
  type:string  = '';
}


export class Benefits {
  mealTickets: MealTicket;

  constructor() {
    this.mealTickets = new MealTicket();
  }

}
