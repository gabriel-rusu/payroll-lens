import {Component, model, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Income} from '../../shared/model/income.model';



@Component({
  selector: 'app-calculator',
  imports: [
    FormsModule
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  income = new Income("Gross", "RON", 0, "Month");
  salary =  output<Income>();

  computeTaxes() {
    this.salary.emit(JSON.parse(JSON.stringify(this.income)));
  }
}
