import { Component } from '@angular/core';
import {CalculatorComponent} from './component/calculator/calculator.component';
import {SalaryBreakdownComponent} from './component/salary-breakdown/salary-breakdown.component';
import {Income} from './shared/model/income.model';

@Component({
  selector: 'app-root',
  imports: [
    CalculatorComponent,
    SalaryBreakdownComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'salary-calculator';
  income?: Income;
}
