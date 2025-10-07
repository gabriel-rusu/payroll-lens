import {PaydayFrequency} from '../constants';

export class MealTicket {
  value: number = 0;
  frequency: PaydayFrequency = PaydayFrequency.DAY;
}


export class Benefits {
  mealTickets: MealTicket;

  constructor() {
    this.mealTickets = new MealTicket();
  }

}
