import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-calculator',
  imports: [
    FormsModule
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  income: {
    type: string;
    value: number;
    daysPerWeek: number;
    hoursPerWeek: number;
    holidays: number;
    vacationDays: number;
    frequency: string;
    currency: string;
  } = {
    type: "Gross",
    value: 0,
    daysPerWeek: 5,
    hoursPerWeek: 40,
    holidays: 10,
    vacationDays: 21,
    frequency: "Month",
    currency: "RON"
  };

}
